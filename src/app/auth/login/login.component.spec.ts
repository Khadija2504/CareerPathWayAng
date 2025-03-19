import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should mark the form as invalid when empty', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as valid when filled with correct data', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should mark the form as invalid with invalid email', () => {
    component.loginForm.setValue({ email: 'invalid-email', password: 'password123' });
    expect(component.loginForm.invalid).toBeTrue();
    expect(component.loginForm.get('email')?.errors?.['email']).toBeTruthy();
  });

  it('should mark the form as invalid with short password', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: '123' });
    expect(component.loginForm.invalid).toBeTrue();
    expect(component.loginForm.get('password')?.errors?.['minlength']).toBeTruthy();
  });

  describe('login', () => {
    it('should not call login if the form is invalid', () => {
      component.loginForm.setValue({ email: '', password: '' });
      component.login();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('should handle login error', () => {
      const mockError = { error: { message: 'Invalid credentials' } };
      authService.login.and.returnValue(throwError(() => mockError));

      component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
      component.login();

      expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
      expect(component.errorMessage).toBe('Invalid credentials');
      expect(component.isSubmitting).toBeFalse();
    });
  });
});
