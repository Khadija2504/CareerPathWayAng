import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-goals',
  standalone: false,
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  errorMessage: string | null = null;
  goals: any[] = [];
  selectedGoal: any = null;
  faEdit = faEdit;
  faTrash = faTrash;
  deleteSuccessMessage: string | null = null;
  deleteErrorMessage: string | null = null;
  userRole: string | null = null;

  constructor(private profileService: ProfileService, private authService:AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.getGoalsList();
    this.getGoalsReminders();
  }

  hasRole(role: string): boolean {
    return this.authService.getUserRole() === role;
  }

  getGoalsList(): void {
    this.errorMessage = null;

    if(this.userRole === 'EMPLOYEE') {
      this.profileService.getAllEmployeeGoals().subscribe({
        next: (response) => {
          this.goals = response;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to load goals. Please try again.';
        },
      });
    } else if(this.userRole === 'ADMIN') {
      this.profileService.getAllGoals().subscribe({
        next: (response) => {
          this.goals = response;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to load goals. Please try again.';
        },
      });
    }

    else{
      console.log(this.userRole);
      
    }
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

  toggleSupport(goalId: number): void {
    const goal = this.goals.find((g) => g.id === goalId);
    if (goal) {
      const newSupportedStatus = !goal.supported;
      this.profileService.supportGoal(goalId, newSupportedStatus).subscribe({
        next: (response) => {
          goal.supported = newSupportedStatus;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update support status. Please try again.';
        },
      });
    }
  }
}