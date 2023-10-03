import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import awsconfig from '../../../../aws-exports-override';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent {

  constructor(private router: Router) {
  }

  onLoginClick() {

    //Auth.federatedSignIn();
    this.router.navigate(['/login']);
   }

   onSignupClick(){
    this.router.navigate(['/register']);
   }
     
}
