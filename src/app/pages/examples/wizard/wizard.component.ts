import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"
import { Auth } from 'aws-amplify';

@Component({
  selector: "app-wizard",
  templateUrl: "wizard.component.html"
})
export class WizardComponent implements OnInit {

  email = '';
  model = '';
  manufacturer = '';
  serialNumber = '';
  notes = '';
  age = '';

  constructor(private activatedRoute: ActivatedRoute, private ordersService: OrdersService, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
     this.manufacturer = params['manufacturer'];
      console.log('on init, manufacturer is',this.manufacturer);
    });

    this.email = "";

    Auth.currentAuthenticatedUser()
    .then(user => {
      this.email = user.attributes.email;
    })
    .catch(() => console.log("Not signed in"));
  }

  postOrder() {

    let order = { orderNumber: this.getOrderNumber(), manufacturer: this.manufacturer, 
      "email":this.email, 
      "status": "Requested",
      "notes": this.notes, 
      "age": this.age, 
      "serialNumber": this.serialNumber, 
      "model": this.model
  };

    this.ordersService.postOrder(order).subscribe({
      error: (err) => { console.error(err) },
      complete: () => { this.router.navigate(['examples/repairs']) }
    });
  }

  getOrderNumber() {
    const x = '1'+String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
    const y = x.substring(0,4) + '-' + x.substring(4);
    return y;
  }
}
