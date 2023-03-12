import { Component, OnInit, TemplateRef } from "@angular/core";
import { OrdersService } from '../../../orders.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from "aws-amplify";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-repair",
  templateUrl: "repair.component.html"
})
export class RepairComponent implements OnInit {

  order = null;
  files: File[] = [];

  photoURLs = new Array();
  selectedPhotoURL = null;

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
    private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");
      let id = params['id'];
      this.ordersService.getOrder(id).subscribe((data) => {
        this.order = data;
      });


      console.log("looging for photos");

      console.log('yyyy',this.order);

      Storage.list(id + '/') // for listing ALL files without prefix, pass '' instead
      .then((result) => {
        console.log('zzzz',this.order);
        console.log('photo results',result);

        result.results.forEach((value)=> {

          var key = value.key;
          console.log("key",key);

          Storage.get(key).then((signedURL) =>{
            console.log("signedURL",signedURL);
            this.photoURLs.push(signedURL);
          })
        });
      }
      
      )
      .catch((err) => console.log(err));

    });
  }

  async onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

    const fileName = this.order.id + "/" + event.addedFiles[0].name;

    console.log("uploading file",fileName);
    const result = await Storage.put(fileName,event.addedFiles[0],{
      //level: "protected"
    });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  
  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.defaultModal = this.modalService.show(modalDefault, this.default);
  }

  openPhotoDetailModal(modalPhotoDetail: TemplateRef<any>, photoURL: string) {
    this.selectedPhotoURL = photoURL;
    this.photoDetailModal = this.modalService.show(modalPhotoDetail, this.photoDetail);
  }

  deleteSelectedImage() {
    console.log('deleting', this.selectedPhotoURL);
  }

}
