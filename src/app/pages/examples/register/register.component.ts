import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit {

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

  public signUp(): void {
  }

  public confirmSignUp(): void {
  }

  onSubmit(): void {
  }
}
