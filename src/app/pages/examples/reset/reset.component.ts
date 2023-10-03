import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from 'aws-amplify';
import { environment } from "../../../../environments/environment";
import { access } from 'fs';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {

  errorMessage: string;
  focus;
  focus1;
  email: string;
  loading = false;
  password;
  passwordConfirm;
  activatedRoute: ActivatedRoute;
  code;

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  constructor(private router: Router, activatedRoute: ActivatedRoute) {
    this.loading = false;
    this.activatedRoute = activatedRoute;
  }

  public async reset() {

    if (this.password != this.passwordConfirm) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    try {
      var resp = await Auth.forgotPasswordSubmit(this.email, this.code, this.password);
      console.log(JSON.stringify(resp));
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('error signing in:', error);
      this.errorMessage = error.message;
    }
  }
}
