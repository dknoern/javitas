import { Component, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss']
})
export class NextStepComponent {

  @Input() modal = null;
  @Input() user = null;

  @Input() order= null;
  @Input() nextStep = null;
  @Input() nextStatus = null;
  isAdmin = false;
  formValid = false;
  ready = false;

  constructor(
    public toastr: ToastrService,
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAdmin = this.ordersService.isUserAdmin(this.user.attributes.email);
  }

  cancelMessage() {
    this.modal.hide();
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
    this.formValid = this.ready === true;
    return this.formValid;
  }

  saveNextStep() {
    this.ordersService.updateOrderStatus(this.order.id, this.nextStatus).then(_ => {
      this.modal.hide();
      this.simpleToast('Status updated successfully')  ;
      this.router.navigate(['repair'], { queryParams: { id: this.order.id, _t: Date.now().toString()}});
    })
  }
}
