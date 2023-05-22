import { Component, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { OrdersService } from '../../../orders.service';
import { WorkflowService } from '../../../workflow.service';
import { Table } from 'primeng/table';

@Component({
  selector: "app-repairs",
  templateUrl: "repairs.component.html",
  styleUrls: ["repairs.component.scss"]
})
export class RepairsComponent implements OnInit {
  orders = [];
  user = null;
  input = '';
  isAdmin = false;
  constructor(
    private ordersService: OrdersService,
    private workflowService: WorkflowService) { }

  ngOnInit() {
    Auth.currentUserInfo()
      .then(user => {
        this.user = user;
        var email = user.attributes.email;
        this.ordersService.getOrders().then(data =>  {

          console.log("response", data);
          if (this.isUserAdmin(email)) {
            this.orders = data;
          } else {
            this.orders = data.filter(order => order.email === email);
          }

          this.orders = this.orders.sort((a,b) => (a.modifiedDate < b.modifiedDate) ? 1 : -1)
        });
      })
      .catch(() => console.log("Not signed in"));
  }

  isUserAdmin(email) {
    this.isAdmin =  email === "oroszlan67@yahoo.com" || email == "david@seattleweb.com";
    return this.isAdmin;
  }
  clear(table: Table) {      
    table.clear();
    this.input='';
 } 

 orderSeverity(status) {
  return this.workflowService.getOrderSeverity(status,this.isAdmin);
 }
}
