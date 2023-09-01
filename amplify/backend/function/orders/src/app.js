const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "orders";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/orders";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
const { randomUUID } = require('crypto'); 

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/************************************
 * HTTP Get method for list objects *
 ************************************/

app.get(path + hashKeyPath, function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

/********************************
 * HTTP Get method for all objects *
 ********************************/

app.get(path, function(req, res) {
  console.log('Updated Get method for all objects');
  console.log('path',path);

  let queryParams = {
    TableName: tableName
  }

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  
  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});

/*************************************
* HTTP post method for insert object *
**************************************/

app.post(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }
  
  req.body.id = randomUUID();
  req.body.createdDate = Date.now();
  req.body.modifiedDate = Date.now();
  req.body.status = 'Repair requested';

  req.body.timeline = [{
    title: 'Repair requested',
    date: req.body.createdDate ,
    description: 'Repair form was submitted for review by Authorized Watch Repair.'
  }];

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: data, id: req.body.id})
    }
  });
});


/**********************************************
* HTTP post estimate (create or update)       *
***********************************************/

app.post(path + '/estimate', function(req, res) {
  
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }
  
  let newStatus = 'approved' === req.body.estimate.approvalStatus ? 'Estimate approved' : 'Estimate created' ;

  let putItemParams = {
    TableName: tableName,
    Key: { 'id': req.body.id },
    UpdateExpression: "set #xName = :x, #yName = :y, #c = list_append(#c, :vals), #mName = :mValue",
    ExpressionAttributeValues: {
      ":x": req.body.estimate,
      ":y": newStatus,
      ":vals": [{
        title: newStatus,
        date: Date.now()
      }],
      ":mValue": Date.now()
    },
    ExpressionAttributeNames: {
      "#xName": "estimate",
      "#yName": "status",
      "#c": "timeline",
      "#mName": "modifiedDate"
    }
  };

  dynamodb.update(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'estimate updated', url: req.url, data: data, id: req.body.id})
    }
  });
});

/**********************************************
* HTTP post method for updating orders status *
***********************************************/

app.post(path + '/status', function(req, res) {
  
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Key: { 'id': req.body.id },
    UpdateExpression: "set #xName = :x, #c = list_append(#c, :vals), #mName = :mValue",
    ExpressionAttributeValues: {
      ":x": req.body.status,
      ":vals": [{
        title: req.body.status,
        date: Date.now()
      }],
      ":mValue": Date.now()
    },
    ExpressionAttributeNames: {
      "#xName": "status",
      "#c": "timeline",
      "#mName": "modifiedDate"
    }
  };

  dynamodb.update(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'status update call!', url: req.url, data: data, id: req.body.id})
    }
  });
});

/**********************************************
* HTTP post method for sending message        *
***********************************************/

app.post(path + '/message', function(req, res) {
  
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Key: { 'id': req.body.id },
    UpdateExpression: "set #c = list_append(#c, :vals), #mName = :mValue",
    ExpressionAttributeValues: {
      ":vals": [{
        title: "Message from " + req.body.from,
        date: Date.now(),
        description: req.body.message
      }],
      ":mValue": Date.now()
    },
    ExpressionAttributeNames: {
      "#c": "timeline",
      "#mName": "modifiedDate"
    }
  };

  dynamodb.update(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'status update call!', url: req.url, data: data, id: req.body.id})
    }
  });
});

/**********************************************
* HTTP post method for updating tracking info *
***********************************************/

app.post(path + '/tracking', function(req, res) {
  
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  // status should be "Watch shipped" or "Watch shipped back"

  let putItemParams = {
    TableName: tableName,
    Key: { 'id': req.body.id },
    UpdateExpression: "set #xName = :x, #yName = :y, #zName = :z, #c = list_append(#c, :vals), #statusName = :statusValue, #mName = :mValue",
    ExpressionAttributeValues: {
      ":x": req.body.shipper,
      ":y": req.body.trackingNumber,
      ":z": Date.now(),
      ":vals": [{
        title: req.body.status,
        date: Date.now() ,
        description: req.body.status + ' via ' + req.body.shipper + ' with tracking number ' + req.body.trackingNumber + '.'
      }],
      ":statusValue": req.body.status,
      ":mValue": Date.now()
    },
    ExpressionAttributeNames: {
      "#xName": "shipper",
      "#yName": "trackingNumber",
      "#zName": "shippedDate",
      "#c": "timeline",
      "#statusName": "status",
      "#mName": "modifiedDate"
    }
  };

  dynamodb.update(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'status update call!', url: req.url, data: data, id: req.body.id})
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
