import { Component, OnInit } from "@angular/core";

import { Auth } from 'aws-amplify';

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit {
  test: Date = new Date();
  isCollapsed = true;
  constructor() {}

  ngOnInit() {

    Auth.currentUserInfo()
    .then(user => {

      console.log('user', JSON.stringify(user));

      console.log('user firstname', JSON.stringify(user.attributes.given_name));
    })
    .catch(() => console.log("Not signed in"));


  }
}