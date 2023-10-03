import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { environment } from "../../../../environments/environment";
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {

  errorMessage: string;
  focus;
  focus1;
  email: string;
  loading = false;

  ngOnInit() { }

  constructor(private router: Router) {
    this.loading = false;
  }

  public async sendCode() {
    try {




      var resp = await Auth.forgotPassword(this.email);
      console.log(JSON.stringify(resp));

      this.router.navigate(['/reset'], { queryParams: { email: this.email}});


  } catch (error) {
    console.log('error signing in:', error);
    this.errorMessage = error.message;
  }
}

}
