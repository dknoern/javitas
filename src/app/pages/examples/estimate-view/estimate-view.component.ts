import { Component, OnInit, Input } from "@angular/core";
import { EstimateService } from '../../../estimate.service';
import { API } from 'aws-amplify';

@Component({
  selector: "app-estimate-view",
  templateUrl: "estimate-view.component.html"
})
export class EstimateViewComponent implements OnInit {

  estimate = null;

  @Input() orderId = '';

  constructor(
    private estimateService: EstimateService,

  ) { }

  ngOnInit() {
    API.get("estimates", "/estimates/object/" + this.orderId, {}).then(result => {
      this.estimate = result;

      //console.log('firstname',this.estimate.necessaryServices[0].name);
      console.log("DATA",JSON.stringify(result));
    }).catch(err => {
      console.log(err);
    })
  }
}
