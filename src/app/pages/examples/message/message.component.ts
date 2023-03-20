import { Component, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() modal = null;
  @Input() user = null;
  isAdmin = false;

  constructor(
    public toastr: ToastrService
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
    this.simpleToast('Message sent');
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


}
