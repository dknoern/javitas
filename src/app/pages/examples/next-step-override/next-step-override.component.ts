import { Component, Input} from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { OrdersService } from '../../../orders.service';
import { Router } from "@angular/router"
import { WorkflowService } from '../../../workflow.service';

@Component({
  selector: 'app-next-step-override',
  templateUrl: './next-step-override.component.html',
  styleUrls: ['./next-step-override.component.scss']
})
export class NextStepOverrideComponent {

  @Input() modal = null;
  @Input() user = null;

  @Input() order= null;
  @Input() nextStep = null;
  @Input() nextStatus = null;
  @Input() status=null;
  isAdmin = false;
  formValid = false;
  workflow = this.workflowService.workflow;

  // filter  this.workflowService.workflow and select new array of items with non-null and non-empty nextStep value
  //workflowNextSteps = this.workflowService.workflow.filter(item => item.nextStep != null && item.nextStep.length > 0);
  workflowNextSteps = this.workflowService.workflow.filter(item => item.status != null && item.status != 'Canceled');




  newNextStep = '';
  newStatus = '';
  
  constructor(
    public toastr: ToastrService,
    private ordersService: OrdersService,
    private workflowService: WorkflowService,
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
    this.formValid = this.newStatus!=null && this.newStatus != '';
    console.log('form valid',this.formValid);
    return this.formValid;
  }

  saveNextStepOverride() {
    this.ordersService.updateOrderStatus(this.order.id, this.newStatus).then(_ => {
      this.modal.hide();
      this.simpleToast('Status updated successfully')  ;
      this.router.navigate(['repair'], { queryParams: { id: this.order.id, _t: Date.now().toString()}});
    })
  }
}
