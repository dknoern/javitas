import { Component, OnInit, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"

@Component({
  selector: "app-estimate-review",
  templateUrl: "estimate-review.component.html"
})
export class EstimateReviewComponent implements OnInit {

  @Input() estimate = null;
  @Input() modal = null;

  necessaryTotal = 0.0;
  optionalTotal = 0.0;
  approvedTotal = 0.0;

  formValid = this.checkForm();

  constructor(
    public toastr: ToastrService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateTotals();
  }

  saveEstimateApproval() {
    console.log(JSON.stringify(this.estimate));

    this.estimate.approvedDate = new Date().toLocaleString();

    this.ordersService.saveEstimate(this.estimate.id, this.estimate)
  .then(() => {
    this.modal.hide();

    this.toastr.show(
      "Estimate approved",
      "",
      {
        timeOut: 3000,
        closeButton: false,
        enableHtml: false,
        tapToDismiss: true,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-default alert-notify"
      }
    );

    this.router.navigate(['repair'], { queryParams: { id: this.estimate.id, _t: Date.now().toString()}}) 

    });
  }

  checkForm() {
    var isValid = false;
    if (this.estimate != null) {

      this.necessaryTotal = 0.0;
      this.optionalTotal = 0.0;
      this.approvedTotal = 0.0;

      isValid = true;

      if(this.estimate.approvalStatus==='approved'){
        this.necessaryTotal = this.estimate.necessaryServices.reduce(
          (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
          parseFloat('0')
        );
      }

      this.estimate.optionalServices.forEach((service) => {
        if(service.approvalStatus==null){
          isValid = false;
        }else if (service.approvalStatus==='approved'){
          this.optionalTotal +=  parseFloat(service.price);
        }
      });
      if(this.estimate.approvalStatus !='approved'){
        isValid = false;
      }
      if(this.estimate.approvedBy == null ||this.estimate.approvedBy =='' ){
        isValid = false;
      }

      this.approvedTotal = this.necessaryTotal + this.optionalTotal;
   
    }
    this.formValid = isValid;
    return isValid;
  }

  public updateTotals(): void{

    if(this.estimate != null) {
    this.necessaryTotal = this.estimate.necessaryServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      parseFloat('0')
    );
    this.optionalTotal = this.estimate.optionalServices.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
      0.0
    );
    this.approvedTotal = this.necessaryTotal + this.optionalTotal;
    }
  }
}
