import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/examples/login/login.component";
import { PricingComponent } from "../../pages/examples/pricing/pricing.component";
import { LockComponent } from "../../pages/examples/lock/lock.component";
import { RegisterComponent } from "../../pages/examples/register/register.component";
import { HomeComponent } from "../../pages/examples/home/home.component";
import { WizardComponent } from "../../pages/examples/wizard/wizard.component";
import { RepairsComponent } from "../../pages/examples/repairs/repairs.component";
import { RepairComponent } from "../../pages/examples/repair/repair.component";
import { EstimateComponent } from "../../pages/examples/estimate/estimate.component";
export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "lock",
        component: LockComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "pricing",
        component: PricingComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "home",
        component: HomeComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "wizard",
        component: WizardComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "repairs",
        component: RepairsComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "repair",
        component: RepairComponent
      }
    ]
  }
  ,
  {
    path: "",
    children: [
      {
        path: "estimate",
        component: EstimateComponent
      }
    ]
  }
];
