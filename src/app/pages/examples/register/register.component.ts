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

  foo: string;

  focus;
  focus1;
  focus2;
  focus3;
  constructor(private router: Router,
    private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;

    this.foo = "hey";
  }

  ngOnInit() {



    console.log("foo1",this.foo);

    window.addEventListener(
      "load",
      function() {

       // console.log(JSON.stringify(this));
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "click",
            function(event) {
              console.log("stringify",JSON.stringify(event));
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  }

  public signUp(): void {

    /*
    console.log("in signup function")
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
    */
  }




  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/examples/login']);
    }).catch((e) => {
      this.loading = false;
      this.errorMessage = e.message;
    });
  }


  onSubmit(): void {
    console.log("onSubmit called");

    console.log("email is ",this.user.email);



    console.log("in signup function")
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
}
