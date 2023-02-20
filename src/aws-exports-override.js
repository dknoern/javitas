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
        "redirectSignIn": "http://localhost:4200/",
        "redirectSignOut": "http://localhost:4200/",
        "responseType": "code"
    }
};

export default awsmobile;
