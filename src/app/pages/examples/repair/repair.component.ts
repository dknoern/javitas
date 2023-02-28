import { Component, OnInit } from "@angular/core";
import { OrdersService } from '../../../orders.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-repair",
  templateUrl: "repair.component.html"
})
export class RepairComponent implements OnInit {

  order = null;
  files: File[] = [];

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
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

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

    this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
