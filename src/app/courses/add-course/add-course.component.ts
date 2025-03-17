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
  file: File | null = null;
  formSubmitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      typeStr: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  addCourse() {
    this.formSubmitted = true;

    if (this.courseForm.invalid || !this.file) {
      this.errorMessage = 'Please fill in all fields correctly and upload a file.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('title', this.courseForm.value.title);
    formData.append('description', this.courseForm.value.description);
    formData.append('type', this.courseForm.value.typeStr);
    formData.append('category', this.courseForm.value.category);
    formData.append('file', this.file);

    console.log(formData);
    
    this.courseService.addCourse(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Course added successfully!';
        console.log(response);
        this.courseForm.reset();
        this.file = null;
        this.formSubmitted = false;
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
  removeFile() {
    this.file = null;
  }
}
