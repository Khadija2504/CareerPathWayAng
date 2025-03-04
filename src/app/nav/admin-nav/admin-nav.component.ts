import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
  imports: [NgIf, RouterLink]
})
export class AdminNavComponent {
  userDetails: any = null;
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isLoading = true;
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router:Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    console.log(this.userDetails);
    
    this.checkLoginStatus();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  hasRole(role: string): boolean {
    console.log(role);
    console.log(this.authService.getUserRole());
    return this.authService.getUserRole() === role;
  }

  logout(): void {
    this.authService.logout();
    this.checkLoginStatus();
    setTimeout(()=> this.router.navigate(['/auth/login']));
  }

  fetchUserDetails(): void {    
    this.profileService.getUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        console.log(response);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching user details:', error);
      },
    }); 
  }
}
