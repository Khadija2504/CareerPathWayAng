import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course-service.service';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  courseForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      typeStr: ['', Validators.required],
      category: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('(https?://.*)')]]
    });
  }

  addCourse() {
    if (this.courseForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.courseService.addCourse(this.courseForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Course added successfully!';
        console.log(response);
        this.courseForm.reset();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to add course. Please try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
