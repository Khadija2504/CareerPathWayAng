import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit{
  updateForm: FormGroup;
  userDetails: any = null;
  isLoading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: [''],
      department: [''],
      jobTitle: [''],
      expertiseArea: [''],
      yearsOfExperience: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.profileService.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        this.populateForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching user details:', error);
      }
    });
  }

  populateForm(): void {
    if (this.userDetails) {
      this.updateForm.patchValue({
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        email: this.userDetails.email,
        role: this.userDetails.role,
        password: this.userDetails.password,
        department: this.userDetails.role === 'EMPLOYEE' ? this.userDetails.department : '',
        jobTitle: this.userDetails.role === 'EMPLOYEE' ? this.userDetails.jobTitle : '',
        expertiseArea: this.userDetails.role === 'MENTOR' ? this.userDetails.expertiseArea : '',
        yearsOfExperience: this.userDetails.role === 'MENTOR' ? this.userDetails.yearsOfExperience : ''
      });
    }
  }

  onSubmit(): void {
    if (this.updateForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const userData = this.updateForm.value;
    this.profileService.updateUserDetails(userData).subscribe({
      next: (response) => {
        this.successMessage = 'User details updated successfully!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/profile/edit-profile']), 2000);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to update user details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.updateForm.controls;
  }
}
