import { LibraryService } from '../library.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  standalone: false,
  templateUrl: './add-resource.component.html',
  styleUrl: './add-resource.component.css'
})
export class AddResourceComponent {
  resourceForm: FormGroup;
  resourceTypes = ['EBOOK', 'ARTICLE', 'CASE_STUDY', 'VIDEO'];
  selectedFile: File | null = null;
  formSubmitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private router: Router
  ) {
    this.resourceForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      type: ['', [Validators.required]],
      resourceUrl: ['', [Validators.required, Validators.maxLength(255)]],
      category: ['', [Validators.maxLength(100)]],
      image: [null, [Validators.required]]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.resourceForm.patchValue({ image: this.selectedFile });
      this.resourceForm.get('image')?.updateValueAndValidity();
    }
  }

  addResource() {
    this.formSubmitted = true;

    if (this.resourceForm.invalid || !this.selectedFile) {
      this.errorMessage = 'Please fill in all fields correctly and upload a file.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('title', this.resourceForm.value.title);
    formData.append('type', this.resourceForm.get('type')?.value);
    formData.append('category', this.resourceForm.get('category')?.value);
    formData.append('resourceUrl', this.resourceForm.get('resourceUrl')?.value);
    formData.append('image', this.selectedFile);

    console.log(this.resourceForm.value.title);
    
    console.log(formData.get);

    this.libraryService.addResource(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Resource added successfully!';
        this.resourceForm.reset();
        this.formSubmitted = false;
        setTimeout(() => this.router.navigate(['/resources']), 2000);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.message || 'Failed to add resource. Please try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  get title() { return this.resourceForm.get('title'); }
  get type() { return this.resourceForm.get('type'); }
  get resourceUrl() { return this.resourceForm.get('resourceUrl'); }
  get category() { return this.resourceForm.get('category'); }
  get image() { return this.resourceForm.get('image'); }
}