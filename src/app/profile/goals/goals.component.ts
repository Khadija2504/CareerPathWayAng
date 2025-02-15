import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals',
  standalone: false,
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnInit {
  errorMessage: string | null = null;
  goals: any[] =[];
  selectedGoal: any = null;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private profileService: ProfileService, private router:Router){}

  ngOnInit(): void {
    this.getGoalsList();
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
