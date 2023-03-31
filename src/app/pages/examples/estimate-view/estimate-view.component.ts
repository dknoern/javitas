import { Component, OnInit, Input } from "@angular/core";
import { EstimateService } from '../../../estimate.service';

@Component({
  selector: "app-estimate-view",
  templateUrl: "estimate-view.component.html"
})
export class EstimateViewComponent implements OnInit {

  @Input() estimate = null;
  grandTotal = 0.0;

  constructor(
    private estimateService: EstimateService
  ) { }

  ngOnInit() {
    this.updateTotals();
  }

  public updateTotals(): void{

    console.log("updatint totals on view");

    const necessaryTotal = this.estimate.necessaryServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      parseFloat('0')
    );

    const optionalTotal = this.estimate.optionalServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      0.0
    );
    this.grandTotal = necessaryTotal + optionalTotal;
  }
}
