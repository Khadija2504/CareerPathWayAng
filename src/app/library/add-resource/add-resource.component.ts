import { LibraryService } from '../library.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-resource',
  standalone: false,
  templateUrl: './add-resource.component.html',
  styleUrl: './add-resource.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class AddResourceComponent implements OnInit{
  resourceForm: FormGroup;
  resourceTypes = ['EBOOK', 'ARTICLE', 'CASE_STUDY', 'VIDEO'];
  selectedFile: File | null = null;
  formSubmitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  resources: any[] = [];
  showAddResourceModal = false;
  actionSuccessMessage: string | null = null;

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

  ngOnInit(): void {    
    this.displayResources();
  }

  displayResources(): void {
    this.errorMessage = '';

    this.libraryService.getAllResources().subscribe({
      next: (data) => {
        this.resources = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch resources. Please try again later.';
        console.error('Error fetching resources:', err);
      }
    });
  }

  openAddResourceModal(): void {
    this.showAddResourceModal = true;
  }

  closeAddResourceModal(): void {
    this.showAddResourceModal = false;
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
        this.successMessage = 'Resource added successfully!!';
        this.resourceForm.reset();
        this.formSubmitted = false;
        this.closeAddResourceModal();
        this.displayResources();
        setTimeout(() => {
          this.actionSuccessMessage = this.successMessage;
        }, 300);
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