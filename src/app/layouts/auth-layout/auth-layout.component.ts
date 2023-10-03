import { Component, OnInit, OnDestroy } from "@angular/core";
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';


@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"]
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  email: string;
  firstName: string;

  isAuthenticated: boolean;

  test: Date = new Date();
  public isCollapsed = true;


  constructor(private router: Router) {
     // Used for listening to login events
     Hub.listen("auth", ({ payload: { event, data } }) => {
       console.log("IN AUTH LAYOUT: auth event type", event);
       if (event === "cognitoHostedUI" || event === "signedIn") {
         console.log("cognito event");
       }
 
       if(event === "signOut") {
         console.log("AUTH LAYOUT: heard sign out event");
         this.email = null;
         this.firstName = null;
         //this.loggedIn = false;
       }
 
       if(event === "signIn") {
         console.log("AUTH LAYOUT: heard sign in event");
         console.log("data is " + JSON.stringify(data));
         this.email = data.attributes.email;
         this.firstName = data.attributes.given_name;

         console.log("LOGGING IN...., attributes are " + JSON.stringify(data.attributes));
         console.log("PHONE IS " + data.attributes['custom:phone']);
         //this.loggedIn = true;
       }
   });
  }

  ngOnInit() {

    this.email = "";
    this.firstName = "";

    Auth.currentAuthenticatedUser()
    .then(user => {
      this.email = user.attributes.email;
      this.firstName = user.attributes.given_name;
    })
    .catch(() => console.log("Not signed in"));

    var html = document.getElementsByTagName("html")[0];
    // html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    var navbar = document.getElementsByClassName("navbar-horizontal")[0];
    navbar.classList.add("navbar-light");
    navbar.classList.add("navbar-transparent");

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

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onLogoutClick() {
    Auth.signOut({ global: true })
      .then(data => {
        this.router.navigate(['/home']);
      })
      .catch(err => console.log(err));
  }
}
