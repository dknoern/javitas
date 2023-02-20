const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_q9FBHA1F2",
    "aws_user_pools_web_client_id": "4jk5m9m082d0oekr0arsp6jlt8",
    "oauth": {
        "domain": "authorized-repair.auth.us-west-2.amazoncognito.com",
        "scope": [
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://main.d2qqstrwqw8l63.amplifyapp.com/",
        "redirectSignOut": "https://main.d2qqstrwqw8l63.amplifyapp.com/",
        "responseType": "code"
    },
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "orders-dev",
            "region": "us-east-1"
        }
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "orders",
            "endpoint": "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev",
            "region": "us-east-1"
        }
    ]
};

export default awsmobile;
