import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userDetails: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.profileService.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching user details:', error);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
