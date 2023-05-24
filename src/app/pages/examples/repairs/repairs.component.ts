import { Component, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";
import { OrdersService } from '../../../orders.service';
import { WorkflowService } from '../../../workflow.service';
import { Table } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
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
  loading = true;

  constructor(
    private ordersService: OrdersService,
    private workflowService: WorkflowService,
    private router: Router) { }

  ngOnInit() {
    Auth.currentUserInfo()
      .then(user => {
        this.user = user;
        this.isAdmin = this.ordersService.isUserAdmin(user.attributes.email);
        this.ordersService.getOrders().then(data =>  {

          console.log("response", data);
          if (this.isAdmin) {
            this.orders = data;
          } else {
            this.orders = data.filter(order => order.email === user.attributes.email);
          }

          this.orders = this.orders.sort((a,b) => (a.modifiedDate < b.modifiedDate) ? 1 : -1);

          this.loading = false;
        });
      })
      .catch(() => 
      {
        this.router.navigate(['/home'], { replaceUrl: true });
      });
  }

  clear(table: Table) {      
    table.clear();
    this.input='';
 } 

 orderSeverity(status) {
  console.log("order severity, is admin: ",this.isAdmin);
  return this.workflowService.getOrderSeverity(status,this.isAdmin);
 }
}
