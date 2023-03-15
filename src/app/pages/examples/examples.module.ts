import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ProfileComponent } from "./profile/profile.component";
import { RepairsComponent } from "./repairs/repairs.component";
import { RepairComponent } from "./repair/repair.component";
import { EstimateComponent } from "./estimate/estimate.component";

import { TimelineComponent } from "./timeline/timeline.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { RouterModule } from "@angular/router";
import { ExamplesRoutes } from "./examples.routing";
import { FormsModule } from '@angular/forms';
import { WizardComponent } from "./wizard/wizard.component";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPrintElementModule } from 'ngx-print-element';
import { EstimateViewComponent } from "./estimate-view/estimate-view.component";
import { EstimateReviewComponent } from "./estimate-review/estimate-review.component";

@NgModule({
  declarations: [ProfileComponent, RepairsComponent, RepairComponent, 
    EstimateComponent, TimelineComponent, WizardComponent, EstimateViewComponent,
    EstimateReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ExamplesRoutes),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    NgxDropzoneModule,
    NgxPrintElementModule
  ]
})
export class ExamplesModule {}
