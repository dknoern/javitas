import { Component, OnInit, Input } from "@angular/core";
import { API } from 'aws-amplify';
import { ToastrService } from "ngx-toastr";
import { OrdersService } from '../../../orders.service';

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
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.updateTotals();
  }

  saveEstimateApproval() {
    console.log(JSON.stringify(this.estimate));

    this.estimate.approvedDate = new Date().toLocaleString();

    const myInit = {
      body: this.estimate, // replace this with attributes you need
      headers: {} // OPTIONAL
    };

    API.post("estimates", "/estimates", myInit)
  .then((response) => {
    console.log("estimate posted");

    this.ordersService.updateOrderStatus(this.estimate.id, "Approved").subscribe({
      error: (err) => { console.error(err) },
      complete: () => { console.log('order status updated') }
    });

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
  })
  .catch((error) => {
    console.log(error.response);
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

    console.log("updating totals");

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
    console.log("total updated");
    }
  }
}
