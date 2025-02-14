import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  standalone: false,
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnInit{
  errorMessage: string | null = null;
  goals: any[] =[];
  selectedGoal: any = null;

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
}
