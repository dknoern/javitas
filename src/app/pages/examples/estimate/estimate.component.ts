import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"

@Component({
  selector: "app-estimate",
  templateUrl: "estimate.component.html"
})
export class EstimateComponent implements OnInit {

  estimate = {
    id: null,
    approvalStatus: null,
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
      let id = params['id'];
      this.ordersService.getOrder(id).then(response=>{
        this.order = response;
        if(this.order.estimate != null){
          this.estimate = this.order.estimate;
          this.estimate.id = id;
        }
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
    this.estimate.approvalStatus = null;
    this.ordersService.saveEstimate(this.order.id, this.estimate).then((response) => {
    this.router.navigate(['repair'], { queryParams: { id: this.order.id, _t: Date.now().toString()}});

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
