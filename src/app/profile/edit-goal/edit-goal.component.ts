import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-goal',
  standalone: false,
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.css'
})
export class EditGoalComponent implements OnInit{
  editGoalForm: FormGroup;
  goalId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editGoalForm = this.fb.group({
      goalDescription: ['', Validators.required],
      targetDate: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.goalId = +params['goalId'];
      this.loadGoalDetails();
    });
  }

  ngOnInit(): void {
  }

  loadGoalDetails(): void {
    this.profileService.getGoalById(this.goalId).subscribe({
      next: (goal) => {
        const targetDate = new Date(goal.targetDate).toISOString().split('T')[0];
        this.editGoalForm.patchValue({
          goalDescription: goal.goalDescription,
          targetDate: targetDate,
          status: goal.status,
          type: goal.type,
        });
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load goal details.';
      },
    });
  }

  onSubmit(): void {
    if (this.editGoalForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const goalData = this.editGoalForm.value;

    this.profileService.updateGoal(this.goalId, goalData).subscribe({
      next: () => {
        this.router.navigate(['/profile/goals']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to update goal.';
      },
    });
  }
}
