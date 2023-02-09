import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: "app-wizard",
  templateUrl: "wizard.component.html"
})
export class WizardComponent implements OnInit {

  manufacturer: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.manufacturer = params['manufacturer'];
    });
  }
}
