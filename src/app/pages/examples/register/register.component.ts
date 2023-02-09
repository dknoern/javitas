import { Component, OnInit } from "@angular/core";
import { IUser, CognitoService } from '../../../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  errorMessage: string;

  focus;
  focus1;
  focus2;
  focus3;
  constructor(private router: Router,
    private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  ngOnInit() {}

  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch((e) => {
      this.loading = false;
      this.loading = false;
      this.errorMessage = e.message;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch((e) => {
      this.loading = false;
      this.errorMessage = e.message;
    });
  }
}
