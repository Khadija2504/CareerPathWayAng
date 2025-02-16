import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  hasRole(role: string): boolean {
    return this.authService.getUserRole() === role;
  }

}
