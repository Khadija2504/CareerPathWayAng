import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [NgIf]
})
export class NavComponent implements OnInit{
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
    console.log(role);
    console.log(this.authService.getUserRole());
    return this.authService.getUserRole() === role;
  }

  logout(): void {
    this.authService.logout();
    this.checkLoginStatus();
    setTimeout(()=> this.router.navigate(['/auth/login']));
  }
}
