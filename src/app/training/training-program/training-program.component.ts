import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-training-program',
  standalone: false,
  templateUrl: './training-program.component.html',
  styleUrl: './training-program.component.css'
})
export class TrainingProgramComponent implements OnInit {
  trainingPrograms: any[] = [];
  displayedTrainingPrograms: any[] = [];
  recommendedCourses: any[] = [];
  recommendedResources: any[] = [];
  isLoading = false;
  currentPage = 0;
  pageSize = 1;
  hasMorePrograms = true;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadTrainingProgram();
  }

  loadTrainingProgram(): void {
    this.isLoading = true;

    this.trainingService.getRecommendations().subscribe({
      next: (res) => {
        this.recommendedCourses = res.courses;
        this.recommendedResources = res.resources;
        this.trainingPrograms = res.trainingPrograms;
        this.displayedTrainingPrograms = this.trainingPrograms.slice(0, this.pageSize);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load recommendations:', err);
        this.isLoading = false;
      }
    });
  }

  loadMoreTrainingPrograms(): void {
    this.currentPage++;
    this.trainingService.getAdditionalTrainingPrograms(this.currentPage, this.pageSize).subscribe({
      next: (programs) => {
        if (programs.length > 0) {
          this.displayedTrainingPrograms = [...this.displayedTrainingPrograms, ...programs];
        } else {
          this.hasMorePrograms = false;
        }
      },
      error: (err) => {
        console.error('Failed to load additional training programs:', err);
      }
    });
  }
}