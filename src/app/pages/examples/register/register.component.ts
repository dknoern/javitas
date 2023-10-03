import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  firstName = '';
  lastName = '';
  phone = '';
  address = '';
  city = '';
  state = '';
  zip = '';

  loading: boolean;
  isConfirm: boolean;
  errorMessage: string;
  foo: string;
  focus;
  focus1;
  focus2;
  focus3;
  constructor(private router: Router) {
    this.loading = false;
    this.isConfirm = false;
  }

  ngOnInit() {
    window.addEventListener(
      "load",
      function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "click",
            function(event) {
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

  public confirmSignUp(): void {
  }

  postOrder() {
    console.log(this.email)
  }

  public async onSubmit() {
    await this.signUp( this.email, this.password, this.firstName, this.lastName, this.phone, this.address, this.city, this.state, this.zip);
  }

  public async signUp( username, password, givenName, familyName, phone, address, city, state, zip) {
    this.loading = true;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          "given_name": givenName,
          "family_name": familyName,
          "phone_number": "+12065551212",
          "custom:phone" : phone,
          "address": address,
          "custom:city": city,
          "custom:state": state,
          "custom:zip": zip
        },
      autoSignIn: {
           //optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);

      this.loading = false;
      this.router.navigate(['/confirm'], { queryParams: { username: this.email } });

    } catch (error) {
      this.loading = false;
      console.log('error signing up:', error);
      this.errorMessage = error.message;
    }
  }
}
