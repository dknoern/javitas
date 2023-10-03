import { Component } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Auth, Hub } from 'aws-amplify';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(private router: Router) {

     this.router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
             // Show loading indicator
             window.scrollTo(0,0);
         }

         if (event instanceof NavigationEnd) {
             // Hide loading indicator
         }

         if (event instanceof NavigationError) {
             // Hide loading indicator

             // Present error to user
             console.log(event.error);
         }
     });


  
      // Used for listening to login events
      Hub.listen("auth", ({ payload: { event, data } }) => {
        console.log("IN APP: auth event type", event);
        if (event === "cognitoHostedUI" || event === "signedIn") {
          console.log("cognito event");
        }
  
        if(event === "signOut") {
          console.log("app heard sign out event");
          
          //this.loggedIn = false;
        }
  
        if(event === "signIn") {
          console.log("app heard sign in event");
          
          //this.loggedIn = true;
        }
    });
   }
}
