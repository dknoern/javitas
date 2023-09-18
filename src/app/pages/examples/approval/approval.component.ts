import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth, Storage } from "aws-amplify";

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit  {

  order = null;
  estimate = null;
  user=null;
  photoURLs = new Array();
  photoKeys = new Array();

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        Auth.currentUserInfo()
        .then(user => {
          this.user = user;
          if(user === null){
            this.router.navigate(['/home'], { replaceUrl: true });
            return;
          }

          let id = params['id'];
          this.ordersService.getOrder(id).then(data=> {
            this.order = data;
    
            // get images
            this.photoURLs = new Array();
            this.photoKeys = new Array();

            if(this.order.estimate != null){
              this.estimate = this.order.estimate;
            }
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
        })
        .catch(() => 
        {
          this.router.navigate(['/home'], { replaceUrl: true });
        });
      });
    });
  }

}
