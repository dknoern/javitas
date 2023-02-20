import { Component, OnInit } from "@angular/core";
import { OrdersService } from '../../../orders.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: "app-repair",
  templateUrl: "repair.component.html"
})
export class RepairComponent implements OnInit {

  order = null;

  constructor( private ordersService: OrdersService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
       console.log('on init, manufacturer is',id);

       this.ordersService.getOrder(id).subscribe((data)=>{
        this.order = data;
      });
     });
  }
}
