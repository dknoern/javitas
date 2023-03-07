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

  defaultModal: BsModalRef;
  default = {
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


}
