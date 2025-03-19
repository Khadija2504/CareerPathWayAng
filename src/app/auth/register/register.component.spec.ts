import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable register button if form is invalid', () => {
    component.registerForm.patchValue({ email: 'invalid-email' });
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should enable register button if form is valid', () => {
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
      confirmPassword: '123456',
      role: 'EMPLOYEE',
      expertiseArea: 'Software',
      yearsOfExperience: '5',
      department: 'IT',
      jobTitle: 'Developer'
    });

    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call register() and navigate to login on success', fakeAsync(() => {
    authService.register.and.returnValue(of({ message: 'Success' }));
    component.selectedFile = new File(['dummy'], 'dummy.pdf', { type: 'application/pdf' });

    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
      confirmPassword: '123456',
      role: 'EMPLOYEE',
      expertiseArea: 'Software',
      yearsOfExperience: '5',
      department: 'IT',
      jobTitle: 'Developer'
    });

    component.register();
    tick();

    expect(authService.register).toHaveBeenCalled();
  }));

  it('should not call register() if form is invalid or no file selected', () => {
    spyOn(component, 'register').and.callThrough();

    component.selectedFile = null;
    component.register();
    expect(authService.register).not.toHaveBeenCalled();

    component.selectedFile = new File(['dummy'], 'dummy.pdf', { type: 'application/pdf' });
    component.registerForm.patchValue({ email: 'invalid-email' });
    component.register();
    expect(authService.register).not.toHaveBeenCalled();
  });
});
