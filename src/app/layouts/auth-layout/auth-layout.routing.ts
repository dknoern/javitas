import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/examples/login/login.component";
import { PricingComponent } from "../../pages/examples/pricing/pricing.component";
import { LockComponent } from "../../pages/examples/lock/lock.component";
import { RegisterComponent } from "../../pages/examples/register/register.component";
import { HomeComponent } from "../../pages/examples/home/home.component";
import { WizardComponent } from "../../pages/examples/wizard/wizard.component";
import { RepairsComponent } from "../../pages/examples/repairs/repairs.component";
import { AuthGuard } from '../../auth.guard';

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
        component: WizardComponent,
        canActivate: [AuthGuard]
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
  }
];
