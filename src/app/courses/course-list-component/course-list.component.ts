import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CourseService } from '../course-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-course-list-component',
  standalone: false,
  templateUrl: './course-list-component.component.html',
  styleUrl: './course-list-component.component.css'
})

export class CourseListComponent implements OnInit {
  courses: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  isLightboxOpen: boolean = false;
  selectedCourse: any = null;

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

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

  getDocumentCover(docUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(docUrl);
  }

  openLightbox(course: any): void {
    this.selectedCourse = course;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedCourse = null;
  }

  hasRole(role: string): boolean {
    return this.authService.getUserRole() === role;
  }
}
