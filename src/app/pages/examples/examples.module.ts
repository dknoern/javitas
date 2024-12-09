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
import { EstimateReviewComponent } from "./estimate-review/estimate-review.component";
import { MessageComponent } from './message/message.component';
import { NewuserComponent } from './newuser/newuser.component';
import { TrackingNumberComponent } from './tracking-number/tracking-number.component';
import { NextStepComponent } from './next-step/next-step.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EstimateViewModule } from "src/app/pages/examples/estimate-view/estimate-view.module";
import { ApprovalStatusModule } from "src/app/pages/examples/approval-status/approval-status.module";
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { NextStepOverrideComponent } from './next-step-override/next-step-override.component';

@NgModule({
  declarations: [ProfileComponent, RepairsComponent, RepairComponent, 
    EstimateComponent, TimelineComponent, WizardComponent,
    EstimateReviewComponent,
    MessageComponent,
    NewuserComponent,
    TrackingNumberComponent,
    NextStepComponent,
    ImageUploadComponent,
    ConfirmComponent,
    ForgotComponent,
    ResetComponent,
    NextStepOverrideComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ExamplesRoutes),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    NgxDropzoneModule,
    NgxPrintElementModule,
    TableModule, TagModule, ButtonModule, InputTextModule, ProgressSpinnerModule, EstimateViewModule, ApprovalStatusModule
  ]
})
export class ExamplesModule {}
