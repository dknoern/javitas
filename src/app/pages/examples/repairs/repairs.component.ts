import { Component, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { OrdersService } from '../../../orders.service';

@Component({
  selector: "app-repairs",
  templateUrl: "repairs.component.html"
})
export class RepairsComponent implements OnInit {
  orders = [];
  user = null;
  isAdmin = false;
  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    Auth.currentUserInfo()
      .then(user => {
        this.user = user;
        var email = user.attributes.email;
        this.ordersService.getOrders().then(response =>  {
          if (this.isUserAdmin(email)) {
            this.orders = response.data;
          } else {
            this.orders = response.data.filter(order => order.email === email);
          }
        });
      })
      .catch(() => console.log("Not signed in"));
  }

  isUserAdmin(email) {
    this.isAdmin =  email === "oroszlan67@yahoo.com" || email == "david@seattleweb.com";
    return this.isAdmin;
  }
}
