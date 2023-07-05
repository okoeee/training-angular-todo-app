import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../model/login.model';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      false
    } else {
      const loginFormValue = this.loginForm.value;
      const loginForm: LoginForm = {
        email: loginFormValue.email,
        password: loginFormValue.password
      }
      this.login(loginForm);
    }
  }

  login(loginForm: LoginForm) {
    this.authService.login(loginForm).subscribe(
      _ => {
        this.router.navigate(['/todo']);
      }
    );
  }

  get emailForm() {
    return this.loginForm.controls['email'];
  }

  get passwordForm() {
    return this.loginForm.controls['password'];
  }

}
