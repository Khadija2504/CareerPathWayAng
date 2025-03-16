import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';
import { MentorShipService } from '../../mentor-ship/mentor-ship.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-mentor-nav',
  standalone: true,
  templateUrl: './mentor-nav.component.html',
  styleUrl: './mentor-nav.component.css',
  imports: [NgIf, RouterLink]

})
export class MentorNavComponent {
  userDetails: any = null;
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isLoading = true;
  errorMessage: string | null = null;
  unreadMessagesCount: number = 0;
  private pollingInterval: any;
  unreadNotificationsCount: number = 0;
  constructor(private authService: AuthService, private router:Router, private profileService: ProfileService,
    private conversationService:MentorShipService,
    private notificationService:NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    console.log(this.userDetails);
    this.fetchUnreadMessagesCount();
    
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

  fetchUnreadNotificationsCount(): void {
    this.notificationService.unreadNotifications().subscribe({
      next: (response: any) => {
        this.unreadNotificationsCount = response.length;
      },
      error: (error) => {
        console.error('Error fetching unread notifications:', error);
      },
    });
  }

  readNotifs(): void {
    this.unreadNotificationsCount = 0;
    this.router.navigate(['/notifications']);
  }

  startPolling(): void {
    this.fetchUnreadNotificationsCount();
    this.fetchUnreadMessagesCount();
    this.pollingInterval = setInterval(() => {
      this.fetchUnreadNotificationsCount();
      this.fetchUnreadMessagesCount();
    }, 5000);
  }

  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  fetchUnreadMessagesCount(): void {
    this.conversationService.unreadMessages().subscribe({
      next: (response: any) => {
        this.unreadMessagesCount = response.length;
      },
      error: (error) => {
        console.error('Error fetching unread messages:', error);
      },
    });
  }
}
