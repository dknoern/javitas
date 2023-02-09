import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ProfileComponent } from "./profile/profile.component";
import { RepairsComponent } from "./repairs/repairs.component";

import { TimelineComponent } from "./timeline/timeline.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { RouterModule } from "@angular/router";
import { ExamplesRoutes } from "./examples.routing";
import { FormsModule } from '@angular/forms';
import { WizardComponent } from "./wizard/wizard.component";

@NgModule({
  declarations: [ProfileComponent, RepairsComponent,  TimelineComponent, WizardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ExamplesRoutes),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class ExamplesModule {}
