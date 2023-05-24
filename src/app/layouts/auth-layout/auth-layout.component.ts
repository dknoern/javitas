import { Component, OnInit, OnDestroy } from "@angular/core";
import { Auth } from 'aws-amplify';

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
   // this.spinner.show();
    Auth.federatedSignIn();
  }

  onLogoutClick() {
    Auth.signOut({ global: true })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}
