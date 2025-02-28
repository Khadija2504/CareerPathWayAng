import { Component } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources-list',
  standalone: false,
  templateUrl: './resources-list.component.html',
  styleUrl: './resources-list.component.css'
})
export class ResourcesListComponent {
  errorMessage: any | null = null;
  resources: any[] = [];
  
  constructor(private libraryService: LibraryService, private router: Router){}

  displayResources(): void {
    this.errorMessage = '';

    this.libraryService.getAllResources().subscribe({
      next: (data) => {
        this.resources = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch resources. Please try again later.';
        console.error('Error fetching resources:', err);
      }
    });
  }

}
