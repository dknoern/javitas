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


    // dump keys to console (temporary)
    for (let i = 0; i < localStorage.length; i++){
          let key = localStorage.key(i);
          let value = localStorage.getItem(key);
          console.log(key, value);
      }

    this.ordersService.getOrders().subscribe((data)=>{
      this.orders = data;
    });
  }
}
