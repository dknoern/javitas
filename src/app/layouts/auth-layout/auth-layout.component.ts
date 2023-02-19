import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Auth, Hub } from 'aws-amplify';
//import { CognitoService } from '../../cognito.service';

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"]
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  email: string;

  isAuthenticated: boolean;

  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {

    this.email = "";

    Auth.currentAuthenticatedUser()
    .then(user => {
      this.email = user.attributes.email;

      console.log('user', JSON.stringify(user));

    })
    .catch(() => console.log("Not signed in"));


    Auth.currentUserInfo()
    .then(user => {

      console.log('user', JSON.stringify(user));

      console.log('user firstname', JSON.stringify(user.attributes.given_name));
    })
    .catch(() => console.log("Not signed in"));




    var html = document.getElementsByTagName("html")[0];
    // html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    var navbar = document.getElementsByClassName("navbar-horizontal")[0];
    navbar.classList.add("navbar-light");
    navbar.classList.add("navbar-transparent");

    /*
        this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
    });


    this.cognitoService.authenticationSubject.subscribe(val => {
      this.isAuthenticated = val;
      })
    */
  }
  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    // html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
    var navbar = document.getElementsByClassName("navbar-horizontal")[0];
    navbar.classList.remove("navbar-light");
    navbar.classList.remove("navbar-transparent");
  }

  /*
    public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/examples/home']);
    });
  */

  onLoginClick() {
    console.log
   // this.spinner.show();
    Auth.federatedSignIn();
  }

  onLogoutClick() {

    console.log("Logout Clicked");

    Auth.signOut({ global: true })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }



}
