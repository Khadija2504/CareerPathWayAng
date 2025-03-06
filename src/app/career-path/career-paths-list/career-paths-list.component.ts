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

}
