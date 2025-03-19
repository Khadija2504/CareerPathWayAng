import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiADMIN\",\"roles\":[\"ADMIN\",\"USER\"]' +
    '.signature';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register API and return response', () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockResponse = { message: 'User registered successfully' };

    service.register(mockUserData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8800/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserData);
    req.flush(mockResponse);
  });

  it('should call login API and return response', () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: 'mock-jwt-token' };

    service.login(mockUserData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8800/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserData);
    req.flush(mockResponse);
  });

  it('should store and retrieve token from localStorage', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    expect(service.getToken()).toBe('mock-jwt-token');
  });

  it('should return true if user is logged in (token exists)', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if user is not logged in (no token)', () => {
    localStorage.removeItem('token');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return null if token is invalid when getting user role', () => {
    spyOn(service, 'getToken').and.returnValue('invalid-token');
    expect(service.getUserRole()).toBeNull();
  });

  it('should return empty array if token is invalid when getting roles', () => {
    spyOn(service, 'getToken').and.returnValue('invalid-token');
    expect(service.getRoles()).toEqual([]);
  });

  it('should clear token from localStorage on logout', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
