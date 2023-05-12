import { Component, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-tracking-number',
  templateUrl: './tracking-number.component.html',
  styleUrls: ['./tracking-number.component.scss']
})
export class TrackingNumberComponent {

  @Input() modal = null;
  @Input() user = null;
  @Input() order= null;
  @Input() nextStatus = null;

  isAdmin = false;
  formValid = false;
  shipper = null;
  trackingNumber = null;

  constructor(
    public toastr: ToastrService,
    private ordersService: OrdersService,
    private router: Router
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
    this.ordersService.updateTracking(this.order.id, this.shipper, this.trackingNumber, this.nextStatus).subscribe({
      error: (err) => { console.error(err) },
      complete: () => { 

        this.modal.hide();
        this.simpleToast('Tracking info saved')  ;
        this.router.navigate(['examples/repair'], { queryParams: { id: this.order.id, _t: Date.now().toString()}}) 
      }
    });
  }
}
