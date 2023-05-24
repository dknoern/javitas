import { Component, Input } from '@angular/core';
import { OrdersService } from '../../../orders.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from "aws-amplify";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router"

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {


  id = "";
  order = null;
  files: File[] = [];
  photoURLs = new Array();
  photoKeys = new Array();

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("ngOnInit");

      this.id = params['id'];
      console.log("id is", this.id);
      this.ordersService.getOrder(this.id).then(response => {
        this.order = response;
      });
    });

  }

  async onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async uploadFile() {

    console.log('uploading file...');
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
    this.files = [];
    this.router.navigate(['repair'], { queryParams: { id: this.id, showImageModal: 'true' }}) 
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
