import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpError } from 'src/app/core/models/http-error';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  redirectTo?: string;
  errorMessage?: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      d => this.redirectTo = d['redirectTo']
    )
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  async onLoginSubmit(): Promise<void> {
    if(!this.loginForm.valid) 
      return;
      
    try {
      await this.authService.login(this.email.value, this.password.value);
      this.router.navigate([this.redirectTo ? this.redirectTo : '/']);
    } catch (error) {
      console.log("catched");
      if(error instanceof HttpError)
        this.errorMessage = error.message;
    }
  }
}
