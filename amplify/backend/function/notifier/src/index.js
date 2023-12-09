/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  SITE_URL
Amplify Params - DO NOT EDIT */

const { cu } = require('@fullcalendar/core/internal-common');
const AWS = require('aws-sdk');
const SES = new AWS.SES();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = event => {
  //console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    
    if('REMOVE' === record.eventName) {
      console.log('REMOVE event, skipping processing');
      return;
    }
    
    //console.log('DynamoDB Record: %j', record);
    const customerEmail = record.dynamodb.NewImage.email.S;
    console.log('email is ', customerEmail);
    console.log('subject is ', record.dynamodb.NewImage.timeline.L[record.dynamodb.NewImage.timeline.L.length - 1].M.title.S);
    
    const id = record.dynamodb.NewImage.id.S;

    // don't sent to AWR if using test customer
    const toAddresses = customerEmail.includes('seattleweb.com') ? [customerEmail] : ["g.watchrepair@gmail.com", customerEmail];
    console.log("customerEmail is", customerEmail);
    console.log("sending email to", toAddresses);

    const params = {
      Destination: {
        ToAddresses: toAddresses,
        BccAddresses: [
          "dknoern@seattleweb.com",
        ],
      },
      Message: {
        Body: {
          Html: { Data: "Hello, you have a new update from Authorized Watch Repair. Please visit the site at https://authorizedwatchrepair.com/#/repair?id=" + id + " to view your update." }
        },
        Subject: {
          Data: 'Message from Authorized Watch Repair'
        },
      },
      Source: 'noreply@authorizedwatchrepair.com'
    };

    // Create the promise and SES service object
    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

    console.log('sending email');
    // Handle promise's fulfilled/rejected states
    sendPromise.then(
      function (data) {
        console.log(data.MessageId);
        return Promise.resolve('Successfully processed DynamoDB record');
      }).catch(
        function (err) {
          console.error(err, err.stack);
          return Promise.resolve('failed');
        });
  }
};
