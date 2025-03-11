import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.registerForm = this.fb.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
          role: ['EMPLOYEE', [Validators.required]],
          expertiseArea: [''],
          yearsOfExperience: [''],
          department: [''],
          jobTitle: ['']
      }, { validators: this.passwordMatchValidator });
  }

  onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
  }

  register() {
      if (this.registerForm.invalid || !this.selectedFile) return;

      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('user', new Blob([JSON.stringify(this.registerForm.value)], {
          type: 'application/json'
      }));

      this.authService.register(formData).subscribe({
          next: (response) => {
              this.successMessage = 'Registration successful! Redirecting to login...';
              setTimeout(() => this.router.navigate(['/auth/login']), 2000);
          },
          error: (error) => {
              this.errorMessage = error.error.message || 'Registration failed. Please try again.';
              this.isSubmitting = false;
          }
      });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }
}