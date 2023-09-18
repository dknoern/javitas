import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from './app-routing.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { BsModalService } from "ngx-bootstrap/modal";
import { PrintLayoutComponent } from './layouts/print-layout/print-layout.component';
import { PrintLayoutModule } from "./layouts/print-layout/print-layout.module";
import { EstimateViewModule } from "./pages/examples/estimate-view/estimate-view.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    PrintLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    PrintLayoutModule,
    EstimateViewModule
  ],
  providers: [
    AmplifyAuthenticatorModule, BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
