import { NgModule } from "@angular/core";
import { EstimateViewComponent } from "./estimate-view.component";
import { ApprovalStatusModule } from "src/app/pages/examples/approval-status/approval-status.module";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [EstimateViewComponent],
  imports: [ ApprovalStatusModule, CommonModule],
  exports: [EstimateViewComponent]
})
export class EstimateViewModule {}
