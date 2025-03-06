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
    console.log(done);
    
    this.careerPathService.updateStepStatus(done, stepId).subscribe({
      next: (res) => {
        console.log('Step status updated successfully:', res);
        this.loadCareerPaths();
      },
      error: (err) => console.error('Failed to update step status:', err),
    });
  }
}
