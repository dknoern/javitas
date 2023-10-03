import { Routes } from "@angular/router";

import { ApprovalComponent } from "../../pages/examples/approval/approval.component";
import { PackingSlipComponent } from "../../pages/examples/packing-slip/packing-slip.component";
import { TestComponent } from "../../pages/examples/test/test.component";

export const PrintLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "approval",
        component: ApprovalComponent
      },
      {
        path: "packing-slip",
        component: PackingSlipComponent
      },
      {
        path: "galaxy",
        component: TestComponent
      }
    ]
  }
];
