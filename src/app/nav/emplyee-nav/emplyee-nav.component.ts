import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-emplyee-nav',
  standalone: true,
  templateUrl: './emplyee-nav.component.html',
  styleUrl: './emplyee-nav.component.css',
  imports: [NgIf, RouterLink]
})
export class EmplyeeNavComponent {
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

