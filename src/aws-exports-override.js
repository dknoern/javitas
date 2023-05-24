/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cloud_logic_custom": [
        {
            "name": "orders",
            "endpoint": "https://6o8gemz2j0.execute-api.us-east-1.amazonaws.com/dev",
            "region": "us-east-1"
        },
        {
            "name": "estimates",
            "endpoint": "https://pmvkokdbnf.execute-api.us-east-1.amazonaws.com/dev",
            "region": "us-east-1"
        }
    ],
    "aws_cognito_identity_pool_id": "us-east-1:9dfbee44-931c-4ebc-a84b-349a5a4859f4",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_vow9feYfu",
    "aws_user_pools_web_client_id": "1cnkucs99f87qh4ljbv47lofrq",
    "oauth": {
        "domain": "javitas434fd371-434fd371-dev.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        //"redirectSignIn": "https://www.authorizedwatchrepair.com/",
        //"redirectSignOut": "https://www.authorizedwatchrepair.com/",
        "redirectSignIn": "http://localhost:4200/",
        "redirectSignOut": "http://localhost:4200/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "ADDRESS",
        "EMAIL",
        "FAMILY_NAME",
        "GIVEN_NAME",
        "PHONE_NUMBER"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "orders-dev",
            "region": "us-east-1"
        },
        {
            "tableName": "estimates-dev",
            "region": "us-east-1"
        }
    ],
    "aws_user_files_s3_bucket": "watch-photos04321-dev",
    "aws_user_files_s3_bucket_region": "us-east-1"
};

export default awsmobile;
