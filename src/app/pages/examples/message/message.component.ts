import { Component, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() modal = null;
  @Input() user = null;
  @Input() orderId= null;
  isAdmin = false;

  message = '';

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
    let firstName = this.user.attributes.given_name;
    this.ordersService.sendMessage(this.orderId, firstName, this.message).then(()=>{
      this.modal.hide();
      this.simpleToast('Message sent')  ;
      this.router.navigate(['repair'], { queryParams: { id: this.orderId, _t: Date.now().toString()}}) 
    })

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
}
