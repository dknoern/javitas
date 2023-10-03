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
  firstName = '';
  lastName = "";
  phone = '';
  address = '';
  city = '';
  state = '';
  zip = '';
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
    });

    this.email = "";

    Auth.currentAuthenticatedUser()
    .then(user => {
      this.email = user.attributes.email;
      this.firstName = user.attributes.given_name;
      this.lastName = user.attributes.family_name;
      this.phone = user.attributes['custom:phone'];
      this.address = user.attributes.address;
      this.city = user.attributes['custom:city'];
      this.state = user.attributes['custom:state'];
      this.zip = user.attributes['custom:zip'];
      this.isAdmin = this.ordersService.isUserAdmin( user.attributes.email);
    })
    .catch(() => {
      this.router.navigate(['/home'], { replaceUrl: true });
  });
  }

  postOrder() {

    let order = { orderNumber: this.getOrderNumber(), manufacturer: this.manufacturer, 
      "email":this.email, 
      "notes": this.notes, 
      "age": this.age, 
      "serialNumber": this.serialNumber, 
      "model": this.model,
      "customer": {
       "firstName": this.firstName,
       "lastName": this.lastName,
       "phone": this.phone,
       "address": this.address,
       "city": this.city,
       "state": this.state,
       "zip": this.zip
      }
  };

    this.ordersService.postOrder(order).then( data2 => { 
        this.router.navigate(['image-upload'], { queryParams: { id: data2['id'] }}) 
      },
      err =>  console.error(err) 
    );
  }

  getOrderNumber() {
    const x = '1'+String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
    const y = x.substring(0,4) + '-' + x.substring(4);
    return y;
  }

  // hack for text area
  public onValueChange(event: Event): void {
    console.log(event.target);
    const value = (event.target as any).value;
    this.notes = value;
  }
}
