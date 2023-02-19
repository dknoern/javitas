import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {

  loading: boolean;

  errorMessage: string;

  focus;
  focus1;
  constructor(private router: Router) {
    this.loading = false;
  }

  public signIn(): void {

  }
  ngOnInit() { }
}
