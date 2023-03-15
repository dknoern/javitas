import { Component, OnInit, Input } from "@angular/core";
import { EstimateService } from '../../../estimate.service';

@Component({
  selector: "app-estimate-view",
  templateUrl: "estimate-view.component.html"
})
export class EstimateViewComponent implements OnInit {

  @Input() estimate = null;

  constructor(
    private estimateService: EstimateService
  ) { }

  ngOnInit() {
  }
}
