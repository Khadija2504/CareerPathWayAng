import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-service.service';

@Component({
  selector: 'app-course-list-component',
  standalone: false,
  templateUrl: './course-list-component.component.html',
  styleUrl: './course-list-component.component.css'
})
export class CourseListComponent implements OnInit{

  courses: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch courses. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching courses:', err);
      }
    });
  }

}
