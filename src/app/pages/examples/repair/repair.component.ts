import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { OrdersService } from '../../../orders.service';
import { WorkflowService } from '../../../workflow.service';
import { ActivatedRoute } from '@angular/router';
import { Auth, Storage } from "aws-amplify";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-repair",
  templateUrl: "repair.component.html"
})
export class RepairComponent implements OnInit {

  order = null;
  estimate = null;
  estimateApproval = null;
  files: File[] = [];
  photoURLs = new Array();
  photoKeys = new Array();
  selectedPhotoURL = null;
  selectedPhotoIndex: number = null;
  user=null;
  isAdmin = false;
  nextStep = null;
  nextStatus = null;
  nextStepWidget = null;
  nextStepWaitText = null;

  customerName = '';
  customerAddress = '';
  customerEmail = '';
  customerPhone = '';

  photoDetailModal: BsModalRef;
  estimateModal: BsModalRef;
  messageModal: BsModalRef;
  trackingNumberModal: BsModalRef;
  nextStepModal: BsModalRef;

  getNextStep() {
    var statusInfo = this.workflowService.getStatusInfo(this.order.status);
    let nextUserType =  statusInfo.isAdmin ? 'Authorized Watch Repair' : 'customer';

    this.nextStep = statusInfo.nextStep;
    this.nextStepWidget = statusInfo.isAdmin === this.isAdmin ? statusInfo.widget : null;
    this.nextStepWaitText = statusInfo.isAdmin != this.isAdmin ? 'Waiting for ' + nextUserType + ' to ' + this.nextStep.toLowerCase() :null;
    this.nextStatus = this.workflowService.getNextStatus(this.order.status);
  }

  modalOptions = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  constructor(
    private ordersService: OrdersService,
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
      this.ordersService.getOrder(id).then(data=> {
        this.order = data;

        if(this.order.estimate != null){
          this.estimate = this.order.estimate;
          this.estimate.id = id; // sometimes missing need to clean this up.
        }

        Auth.currentUserInfo()
        .then(user => {
          this.user = user;
          this.isUserAdmin(user.attributes.email);

          this.customerName = user.attributes.given_name + ' ' + user.attributes.family_name;
          this.customerAddress = user.attributes.address;
          this.customerEmail = user.attributes.email;
          this.customerPhone = user.attributes.phone_number;
          this.getNextStep();
        })
        .catch(() => console.log("Not signed in"));
      });

      let showImageModal = params['showImageModal'];

      // get images
      this.photoURLs = new Array();
      this.photoKeys = new Array();
      Storage.list(id + '/') 
      .then((result) => {
        result.results.forEach((value) => {
          var key = value.key;
          this.photoKeys.push(key);
          Storage.get(key).then((signedURL) => {
            this.photoURLs.push(signedURL);
          })
        });
      }
      )
      .catch((err) => console.log(err));
    });
  }

  openPhotoDetailModal(modal: TemplateRef<any>, photoURL: string, i: number) {
    this.selectedPhotoURL = photoURL;
    this.selectedPhotoIndex = i;
    this.photoDetailModal = this.modalService.show(modal, this.modalOptions);
  }

  openEstimateModal(modal: TemplateRef<any>) {
    this.estimateModal = this.modalService.show(modal, this.modalOptions);
  }

  openMessageModal(modal: TemplateRef<any>) {
    this.messageModal = this.modalService.show(modal, this.modalOptions);
  }

  openTrackingNumberModal(modal: TemplateRef<any>) {
    this.trackingNumberModal = this.modalService.show(modal, this.modalOptions);
  }

  openNextStepModal(modal: TemplateRef<any>) {
    this.nextStepModal = this.modalService.show(modal, this.modalOptions);
  }
  deleteSelectedImage() {
    this.photoDetailModal.hide();

    swal.fire({
      title: "Are you sure?",
      text: "Do you want to permanently delete the selected image?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: "btn btn-warning"
      },
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {

        Storage.remove(this.photoKeys[this.selectedPhotoIndex]);

        delete this.photoKeys[this.selectedPhotoIndex];
        delete this.photoURLs[this.selectedPhotoIndex];
        this.simpleToast('Image deleted');
      }
    });
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

  isUserAdmin(email) {
    this.isAdmin =  email === "oroszlan67@yahoo.com" || email == "david@seattleweb.com";
    return this.isAdmin;
  }

  isStatusAndAdmin(status, admin) {
    return this.order!=null && this.order.status != null &&status === this.order.status && admin === this.isAdmin;
  }

  orderSeverity(status) {
    return this.workflowService.getOrderSeverity(status,this.isAdmin);
   }
}
