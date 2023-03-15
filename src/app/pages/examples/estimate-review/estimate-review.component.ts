import { Component, OnInit, Input } from "@angular/core";
import { API } from 'aws-amplify';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-estimate-review",
  templateUrl: "estimate-review.component.html"
})
export class EstimateReviewComponent implements OnInit {

  @Input() estimate = null;
  @Input() modal = null;

  formValid = this.checkForm();

  constructor(
    public toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  saveEstimateApproval() {
    console.log(JSON.stringify(this.estimate));

    const myInit = {
      body: this.estimate, // replace this with attributes you need
      headers: {} // OPTIONAL
    };

    API.post("estimates", "/estimates", myInit)
  .then((response) => {
    console.log("estimate posted");
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
      isValid = true;
      this.estimate.optionalServices.forEach((service) => {
        if(service.approvalStatus==null){
          isValid = false;
        }
      });
      if(this.estimate.approvalStatus !='approved'){
        isValid = false;
      }
      if(this.estimate.approvedBy == null ||this.estimate.approvedBy =='' ){
        isValid = false;
      }
    }
    this.formValid = isValid;
    return isValid;
  }
}
