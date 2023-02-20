import { Component, OnInit } from "@angular/core";
import { OrdersService } from '../../../orders.service';

@Component({
  selector: "app-repairs",
  templateUrl: "repairs.component.html"
})
export class RepairsComponent implements OnInit {
  orders = null;
  constructor( private ordersService: OrdersService) {}

  ngOnInit() {

    this.ordersService.getOrders().subscribe((data)=>{
      this.orders = data;
    });
  }
}
