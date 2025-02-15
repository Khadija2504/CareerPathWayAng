import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userDetails: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  goals: any[] = [];
  selectedGoal: any = null;
  faEdit = faEdit;
    faTrash = faTrash;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.getGoalsList();
  }

  fetchUserDetails(): void {
    this.profileService.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching user details:', error);
      },
    }); 
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getGoalsList(): void {
    this.errorMessage = null;

    this.profileService.getAllEmployeeGoals().subscribe({
      next: (response) => {
        this.goals = response.slice(-3);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load goals. Please try again.';
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
}