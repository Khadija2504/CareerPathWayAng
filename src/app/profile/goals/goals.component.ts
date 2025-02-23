import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals',
  standalone: false,
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  errorMessage: string | null = null;
  goals: any[] =[];
  selectedGoal: any = null;
  faEdit = faEdit;
  faTrash = faTrash;
  deleteSuccessMessage: string | null = null;
  deleteErrorMessage: string | null = null;

  constructor(private profileService: ProfileService, private router:Router){}

  ngOnInit(): void {
    this.getGoalsList();
    this.getGoalsReminders();
  }

  getGoalsList(): void {
    this.errorMessage = null;

    this.profileService.getAllEmployeeGoals().subscribe({
      next: (response) => {
        this.goals = response;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load goals. Please try again.';
      },
    });
  }

  getGoalsReminders(): void {
    this.errorMessage = null;

    this.profileService.getGoalReminders().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load goal reminders. Please try again.';
      },
    });
  }

  updateGoalStatus(goalId: number, newStatus: string): void {
    const goalData = { goalId, status: newStatus };

    this.profileService.updateGoalStatus(goalData).subscribe({
      next: (response) => {
        const updatedGoal = this.goals.find((goal) => goal.id === goalId);
        if (updatedGoal) {
          updatedGoal.status = newStatus;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update goal status. Please try again.';
      },
    });
  }

  deleteGoal(goalId: number): void {
    const isConfirmed = confirm('Are you sure you want to delete this goal?');
    if (!isConfirmed) return;

    this.profileService.deleteGoal(goalId).subscribe({
      next: () => {
        this.goals = this.goals.filter((goal) => goal.id !== goalId);

        this.deleteSuccessMessage = 'Goal deleted successfully!';
        setTimeout(() => {
          this.deleteSuccessMessage = null;
        }, 5000);
      },
      error: (error) => {
        this.deleteErrorMessage = error.error?.message || 'Failed to delete goal. Please try again.';
        setTimeout(() => {
          this.deleteErrorMessage = null;
        }, 5000);
      },
      });
    }

  editGoal(goal: any): void {
    this.router.navigate(['/profile/edit-goal', goal.id]);
    console.log("goal id:", goal.id);
  }
}