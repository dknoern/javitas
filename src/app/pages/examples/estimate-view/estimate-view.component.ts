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

  public updateTotals(): void {

    console.log("updatint totals on view");

    if(this.estimate!=null && this.estimate.necessaryServices!=null){

    const necessaryTotal = this.estimate.necessaryServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      parseFloat('0')
    );

    const optionalTotal = this.estimate.optionalServices.reduce(
      (accumulator, currentValue) =>
        //if (currentValue.approvalStatus != 'approved') {
          accumulator + this.getOptionalValue(currentValue), parseFloat('0')
        //}
    
    );
    this.grandTotal = parseFloat(necessaryTotal + optionalTotal);
    }
  }

  getOptionalValue(service){
    if(service.approvalStatus==='approved'){
      return parseFloat(service.price);
    }
    return 0.0;
  }
}
