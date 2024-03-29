import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PrintLayoutComponent } from "./layouts/print-layout/print-layout.component";

const routes: Routes = [


  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: "print",
    component: PrintLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./layouts/print-layout/print-layout.module').then(m => m.PrintLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
