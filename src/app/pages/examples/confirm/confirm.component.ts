import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {

  loading: boolean;
  username: "";
  code = "";


  focus;
  focus1;
  errorMessage: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
      });
    }



  public async confirm(){
    try {
      await Auth.confirmSignUp(this.username, this.code);
      this.router.navigate(['/home']);

    } catch (error) {
      console.log('error confirming sign up', error);
      this.errorMessage = error.message;
    }
  }





}
