import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../../cognito.service';


@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {

  loading: boolean;
  user: IUser;
  errorMessage: string;

  focus;
  focus1;
  constructor(private router: Router,
    private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
      .then(() => {
        this.router.navigate(['/examples/home']);
      }).catch((e) => {
        this.loading = false;
        this.errorMessage = e.message;
      });
  }
  ngOnInit() { }
}
