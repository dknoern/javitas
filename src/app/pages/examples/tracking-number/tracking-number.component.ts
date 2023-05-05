import { Component, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { API } from 'aws-amplify';
import { OrdersService } from '../../../orders.service';

@Component({
  selector: 'app-tracking-number',
  templateUrl: './tracking-number.component.html',
  styleUrls: ['./tracking-number.component.scss']
})
export class TrackingNumberComponent {

  @Input() modal = null;
  @Input() user = null;
  @Input() orderId= null;
  isAdmin = false;
  formValid = false;
  shipper = null;
  trackingNumber = null;

  constructor(
    public toastr: ToastrService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.isAdmin = this.isUserAdmin();
  }

  cancelMessage() {
    this.modal.hide();
  }

  isUserAdmin() {
    var email = this.user.attributes.email
    const isAdmin = email === "oroszlan67@yahoo.com" || email == "david@seattleweb.com";
    return isAdmin;
  }


  sendMessage() {
    this.simpleToast('Tracking number saved');
    this.modal.hide();
  }

  simpleToast(message){
    this.toastr.show(
      message,
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
  }


  checkForm() {
    this.formValid = this.trackingNumber != null && this.trackingNumber != "" && this.shipper != null && this.shipper != "";
    return this.formValid;
  }



  saveTrackingNumber() {

    this.ordersService.updateTracking(this.orderId, this.shipper, this.trackingNumber).subscribe({
      error: (err) => { console.error(err) },
      complete: () => { 

        this.modal.hide();
        this.simpleToast('Tracking info saved')
      }
    });
  }
}
