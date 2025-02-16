import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-goals',
  standalone: false,
  templateUrl: './add-goals.component.html',
  styleUrl: './add-goals.component.css'
})
export class AddGoalsComponent {
  goalForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.goalForm = this.fb.group({
      goalDescription: ['', [Validators.required, Validators.maxLength(500)]],
      targetDate: ['', [Validators.required]],
      status: ['NOT_STARTED', [Validators.required, Validators.pattern(/NOT_STARTED|IN_PROGRESS|COMPLETED/)]],
      type: ['', [Validators.required, Validators.pattern(/longTerm|shortTerm/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.goalForm.invalid) return;
  
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
  
    const goalData = this.goalForm.value;
    console.log(goalData);
    
    this.profileService.addGoal(goalData).subscribe({
      next: (response) => {
        console.log(response);
        
        this.successMessage = 'Goal added successfully!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/profile/goals']), 2000);
      },
      error: (error) => {
        this.isLoading = false;
  
        this.errorMessage = error.message || 'Failed to add goal. Please try again.';
  
        if (error.errors) {
          Object.keys(error.errors).forEach(field => {
            const control = this.goalForm.get(field);
            if (control) {
              control.setErrors({ serverError: error.errors[field] });
            }
          });
        }
      }
    });
  }

  get f() {
    return this.goalForm.controls;
  }
}
