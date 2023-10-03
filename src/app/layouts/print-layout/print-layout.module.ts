import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PrintLayoutRoutes } from "./print-layout.routing";

import { ApprovalComponent } from "../../pages/examples/approval/approval.component";

import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { EstimateViewModule } from "src/app/pages/examples/estimate-view/estimate-view.module";
import { ApprovalStatusModule } from "src/app/pages/examples/approval-status/approval-status.module";
import { PackingSlipComponent } from "src/app/pages/examples/packing-slip/packing-slip.component";
import { TestComponent } from "src/app/pages/examples/test/test.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PrintLayoutRoutes),
    FormsModule, CollapseModule, TooltipModule, BsDropdownModule, EstimateViewModule, ApprovalStatusModule
  ],
  declarations: [
    ApprovalComponent,
    PackingSlipComponent,
    TestComponent
  ]
})
export class PrintLayoutModule {}
