import { Component, OnInit } from '@angular/core';
import { CareerPathService } from '../career-path.service';
import { CareerPath } from '../create-career-path/career-path.model';

@Component({
  selector: 'app-career-paths-list',
  standalone: false,
  templateUrl: './career-paths-list.component.html',
  styleUrl: './career-paths-list.component.css'
})
export class CareerPathsListComponent implements OnInit {
  existingCareerPaths: CareerPath[] = [];
  showModal: boolean = false;

  constructor(
    private careerPathService: CareerPathService,
  ) {
    
  }

  ngOnInit(): void {
    this.loadCareerPaths();
  }

  loadCareerPaths(): void {
    this.careerPathService.loadEmployeeCareerPaths().subscribe({
      next: (careerPath) => (this.existingCareerPaths = careerPath),
      error: (err) => console.error('Failed to load career paths:', err)
    });
  }

  updateStep(stepId: any, done: boolean): void {    
    this.careerPathService.updateStepStatus(done, stepId).subscribe({
      next: (res) => {
        console.log('Step status updated successfully:', res);
        this.loadCareerPaths();
        const careerPath = this.existingCareerPaths.find(path => path.steps.some(step => step.id === stepId));
        if (careerPath && careerPath.steps.every(step => step.done)) {
          this.showCompletionConfirmation(careerPath.id);
        }
      },
      error: (err) => console.error('Failed to update step status:', err),
    });
  }
  
  showCompletionConfirmation(careerPathId: any): void {
    const confirmed = confirm('You have completed all steps. Do you want to finish this career path and generate a certification?');
    if (confirmed) {
      console.log(careerPathId);
      this.careerPathService.completeCareerPath(careerPathId).subscribe({
        next: (certification) => {
          console.log('Career path completed and certification generated:', certification);
          alert('Career path completed successfully! Your certification is ready.');
          this.loadCareerPaths();
        },
        error: (err) => console.error('Failed to complete career path:', err),
      });
    }
  }
}
