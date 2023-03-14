import { Component, OnInit, TemplateRef } from "@angular/core";
import { OrdersService } from '../../../orders.service';
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
  files: File[] = [];
  photoURLs = new Array();
  photoKeys = new Array();
  selectedPhotoURL = null;
  selectedPhotoIndex: number = null;
  user=null;

  defaultModal: BsModalRef;
  photoDetailModal: BsModalRef;

  default = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  photoDetail = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
      this.ordersService.getOrder(id).subscribe((data) => {
        this.order = data;
      });

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

    Auth.currentUserInfo()
    .then(user => {
      this.user = user;
    })
    .catch(() => console.log("Not signed in"));
  }

  async onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  openPhotoDetailModal(modalPhotoDetail: TemplateRef<any>, photoURL: string, i: number) {
    this.selectedPhotoURL = photoURL;
    this.selectedPhotoIndex = i;
    this.photoDetailModal = this.modalService.show(modalPhotoDetail, this.photoDetail);
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

  async uploadFile() {

    for (var i = 0; i < this.files.length; i++) {
      const fileName = this.order.id + "/" + this.files[i].name;
      const result = await Storage.put(fileName, this.files[i],{});

      var key = result.key;
      this.photoKeys.push(key);
      Storage.get(key).then((signedURL) => {
        this.photoURLs.push(signedURL);
      })
    }

    this.simpleToast('Photo uploaded');
    this.defaultModal.hide();
    this.files = [];
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
