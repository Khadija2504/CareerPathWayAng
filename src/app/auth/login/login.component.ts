import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: String | null = null;
  successMessage: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const userData = this.loginForm.value;
    this.authService.login(userData).subscribe({
      next: (Response) => {
          console.log(Response);
          localStorage.setItem('token', JSON.stringify(Response));
          const userRole = this.authService.getUserRole();
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => {
              if (userRole === 'MENTOR') {
                  this.router.navigate(['/mentorShip-coaching/mentorships-list']);
              } else if (userRole === 'EMPLOYEE') {
                  this.router.navigate(['/home']);
              } else {
                  this.router.navigate(['']);
              }
          }, 200);
      },
      error: (error) => {
          this.errorMessage = error.error.message || 'login failed. Please try again';
          this.isSubmitting = false;
      }
    });
}

  get f() {
    return this.loginForm.controls;
  }

}
