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
  isAdmin = false;

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
      this.isUserAdmin(this.email);
    })
    .catch(() => console.log("Not signed in"));
  }

  postOrder() {

    let order = { orderNumber: this.getOrderNumber(), manufacturer: this.manufacturer, 
      "email":this.email, 
      "notes": this.notes, 
      "age": this.age, 
      "serialNumber": this.serialNumber, 
      "model": this.model
  };

    this.ordersService.postOrder(order).then( data2 => { 
        console.log("data returned is " + JSON.stringify(data2));
        console.log("new id is " + data2['id']);
        this.router.navigate(['examples/image-upload'], { queryParams: { id: data2['id'] }}) 
      },
      err =>  console.error(err) 
    );
  }

  getOrderNumber() {
    const x = '1'+String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
    const y = x.substring(0,4) + '-' + x.substring(4);
    return y;
  }

  isUserAdmin(email) {
    this.isAdmin =  email === "oroszlan67@yahoo.com" || email == "david@seattleweb.com";
    return this.isAdmin;
  }

  // hack for text area
  public onValueChange(event: Event): void {
    console.log(event.target);
    const value = (event.target as any).value;
    this.notes = value;
  }
}
