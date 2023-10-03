import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {

  loading: boolean;

  errorMessage: string;

  email: string;
  password: string

  focus;
  focus1;
  constructor(private router: Router) {
    this.loading = false;
  }


  ngOnInit() { }


  public async signIn() {
    this.loading = true;
    try {
      const user = await Auth.signIn(this.email, this.password);
      this.loading = false;
      this.router.navigate(['/home']);
  } catch (error) {
    this.loading = false;
    console.log('error signing in:', error);
    this.errorMessage = error.message;
  }



  }




}
