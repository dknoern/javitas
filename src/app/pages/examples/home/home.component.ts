import { Component, OnInit } from "@angular/core";

import { Auth, Hub } from 'aws-amplify';
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit {
  test: Date = new Date();
  isCollapsed = true;
  loggedIn: boolean = false;

  constructor(private router: Router) {

    // Used for listening to login events
    Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("IN HOME: auth event type", event);
      if (event === "cognitoHostedUI" || event === "signedIn") {
        console.log("cgnito event");
        console.log("data is ", JSON.stringify(data));
      }
    });
  }

  ngOnInit() {

    Auth.currentUserInfo()
    .then(user => {

      console.log('home: user', JSON.stringify(user));

      console.log('home: user firstname', JSON.stringify(user.attributes.given_name));
      this.loggedIn = true;
    })
    .catch(() => console.log("Not signed in"));
  }

  gotoWizard(manufacturer: string) {
    if(!this.loggedIn){
      this.router.navigate(['/newuser'], { queryParams: { manufacturer: manufacturer } });

    }else {
      this.router.navigate(['/wizard'], { queryParams: { manufacturer: manufacturer } });
    }
  }
}