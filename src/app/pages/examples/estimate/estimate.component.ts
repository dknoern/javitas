import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { API } from 'aws-amplify';
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"

@Component({
  selector: "app-estimate",
  templateUrl: "estimate.component.html"
})
export class EstimateComponent implements OnInit {

  estimate = {
    id: null,
    necessaryServices: [{name:'',price:null}],
    optionalServices: [{name:'',price:null}]
  };

  order = null;
  necessaryTotal = 0.0;
  optionalTotal = 0.0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
      console.log('on init, id is', id);

      this.estimate.id = id;

      const myInit = {
        headers: {}, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        // queryStringParameters: {
        //   name: 'param' // OPTIONAL
        // }
      };

      API.get("estimates", "/estimates/object/" + id, myInit)
        .then((response) => {
          if(response.data != null && response.data.necessaryServices !=null && response.data.necessaryServices.length>0) {
            this.estimate = response.data;
            if(this.estimate.optionalServices == null || this.estimate.optionalServices.length==0 ){
              this.estimate.optionalServices =  [{name:'',price:null}];
            }
          }
          this.updateTotals();
        })
        .catch((error) => {
          console.log('got error');
        });
    });

    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
      this.ordersService.getOrder(id).subscribe((data) => {
        this.order = data;
      });
    });
  }

  public addNecessaryService(): void {
    this.estimate.necessaryServices.push({name:'',price:null});
  }

  public removeNecessaryService(i): void {
    const firstHalf = this.estimate.necessaryServices.slice(0,i)
    const secondHalf = this.estimate.necessaryServices.slice(i+1,this.estimate.necessaryServices.length)
    this.estimate.necessaryServices = firstHalf.concat(secondHalf);
  }

  public addOptionalService(): void {
    this.estimate.optionalServices.push({name:'',price:null});
  }

  public removeOptionalService(i): void {
    const firstHalf = this.estimate.optionalServices.slice(0,i)
    const secondHalf = this.estimate.optionalServices.slice(i+1,this.estimate.optionalServices.length)
    this.estimate.optionalServices = firstHalf.concat(secondHalf);
  }

  public saveEstimate(): void {

    const myInit = {
      body: this.estimate, // replace this with attributes you need
      headers: {} // OPTIONAL
    };

    API.post("estimates", "/estimates", myInit)
  .then((response) => {
    // Add your code here
    console.log("estimate posted");

    this.ordersService.updateOrderStatus(this.estimate.id, "Estimated").subscribe({
      error: (err) => { console.error(err) },
      complete: () => { console.log('order status updated') }
    });


    this.router.navigate(['examples/repairs'])
  })
  .catch((error) => {
    console.log(error.response);
  });
  }

  public updateTotals(): void{
    this.necessaryTotal = this.estimate.necessaryServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      parseFloat('0')
    );
    this.optionalTotal = this.estimate.optionalServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      0.0
    );
  }
}
