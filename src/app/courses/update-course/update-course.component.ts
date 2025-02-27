import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-course',
  standalone: false,
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
  editcourseForm: FormGroup;
  courseId: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editcourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      typeStr: ['', Validators.required],
      category: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('(https?://.*)')]]
    });

    this.route.params.subscribe((params) => {
      this.courseId = +params['courseId'];
      this.loadCourseDetails();
    });
  }

  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.editcourseForm.patchValue({
          description: course.description,
          title: course.title,
          typeStr: course.typeStr,
          category: course.category,
          url: course.url,
        });
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load course details.';
      },
    });
  }

  onSubmit(): void {
    if (this.editcourseForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const courseData = this.editcourseForm.value;

    this.courseService.updateCourse(courseData, this.courseId).subscribe({
      next: () => {
        this.successMessage = "updated successfully!! ";
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to update course.';
      },
    });
  }
}
