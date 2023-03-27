import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import awsconfig from '../../../../aws-exports-override';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent {

  onLoginClick() {

    console.log("on login click....");
    Auth.federatedSignIn();
    // this.spinner.show();
     //Auth.federatedSignIn();
   }

   onSignupClick(){

    var encodedRedirect = encodeURIComponent(awsconfig.oauth.redirectSignIn);
    var signupUrl = `https://${awsconfig.oauth.domain}/signup?redirect_uri=${encodedRedirect}&response_type=code&client_id=${awsconfig.aws_user_pools_web_client_id}`;

    window.location.href = signupUrl;
   }
      
}
