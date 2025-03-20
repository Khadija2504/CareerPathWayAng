import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CareerPathService } from './career-path.service';
import { CareerPath } from './create-career-path/career-path.model';
import { HttpHeaders } from '@angular/common/http';

describe('CareerPathService', () => {
  let service: CareerPathService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CareerPathService],
    });
    service = TestBed.inject(CareerPathService);
    httpMock = TestBed.inject(HttpTestingController);

    let store: { [key: string]: string } = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });

    localStorage.setItem('token', JSON.stringify({ token: 'mock-token' }));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if user is logged in', () => {
    expect(service.isLoggedin()).toBeTrue();
  });

  it('should create a career path', () => {
    const mockCareerPath: CareerPath = {
      name: 'Frontend Developer',
      description: 'Frontend career path',
      employeeId: 1,
      steps: [],
      done: false,
    };

    service.createCareerPath(mockCareerPath).subscribe((response) => {
      expect(response).toEqual(mockCareerPath);
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/create-careerPath'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockCareerPath);
  });

  it('should handle error when creating a career path fails', () => {
    const mockCareerPath: CareerPath = {
      name: 'Frontend Developer',
      description: 'Frontend career path',
      employeeId: 1,
      steps: [],
      done: false,
    };

    service.createCareerPath(mockCareerPath).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/create-careerPath'
    );
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should load employees', () => {
    const mockEmployees = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    ];

    service.loadEmployees().subscribe((response) => {
      expect(response).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('http://localhost:8800/api/user/allEmployees');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockEmployees);
  });

  it('should load career paths', () => {
    const mockCareerPaths = [
      {
        id: 1,
        name: 'Frontend Developer',
        description: 'Frontend career path',
        employeeId: 1,
        steps: [],
        done: false,
      },
    ];

    service.loadCareerPaths().subscribe((response) => {
      expect(response).toEqual(mockCareerPaths);
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/getAllCareerPaths'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockCareerPaths);
  });

  it('should load employee career paths', () => {
    const mockCareerPaths = [
      {
        id: 1,
        name: 'Frontend Developer',
        description: 'Frontend career path',
        employeeId: 1,
        steps: [],
        done: false,
      },
    ];

    service.loadEmployeeCareerPaths().subscribe((response) => {
      expect(response).toEqual(mockCareerPaths);
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/employee/getAllCareerPaths'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockCareerPaths);
  });

  it('should get career path by ID', () => {
    const mockCareerPath = {
      id: 1,
      name: 'Frontend Developer',
      description: 'Frontend career path',
      employeeId: 1,
      steps: [],
      done: false,
    };

    service.getCareerPathById(1).subscribe((response) => {
      expect(response).toEqual(mockCareerPath);
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/getCareerPath/1'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockCareerPath);
  });

  it('should update career path', () => {
    const mockCareerPath: CareerPath = {
      id: 1,
      name: 'Frontend Developer',
      description: 'Frontend career path',
      employeeId: 1,
      steps: [],
      done: false,
    };

    service.updateCareerPath(mockCareerPath, 1).subscribe((response) => {
      expect(response).toEqual(mockCareerPath);
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/updateCareerPath/1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockCareerPath);
  });

  it('should handle validation errors when updating career path', () => {
    const mockCareerPath: CareerPath = {
      id: 1,
      name: 'Frontend Developer',
      description: 'Frontend career path',
      employeeId: 1,
      steps: [],
      done: false,
    };

    service.updateCareerPath(mockCareerPath, 1).subscribe({
      next: () => fail('Expected validation errors, but got a successful response'),
      error: (error) => {
        expect(error).toEqual(['Validation error 1', 'Validation error 2']);
      },
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/updateCareerPath/1'
    );
    req.flush(['Validation error 1', 'Validation error 2'], { status: 400, statusText: 'Bad Request' });
  });

  it('should delete career path', () => {
    service.deleteCareerPath(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/admin/deleteCareerPath/1'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });

  it('should update step status', () => {
    service.updateStepStatus(true, 1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/employee/updateStepStatus/1'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });

  it('should complete career path', () => {
    service.completeCareerPath(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'http://localhost:8800/api/careerPath/employee/completeCareerPath/1'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });

  it('should get career path certification', () => {
    const mockCertification = {
      id: 1,
      certificateUrl: 'http://example.com/certificate.pdf',
      certificationDate: '2023-10-01',
    };

    service.getCareerPathCertification(1).subscribe((response) => {
      expect(response).toEqual(mockCertification);
    });

    const req = httpMock.expectOne('http://localhost:8800/api/certifications/1');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockCertification);
  });
});
