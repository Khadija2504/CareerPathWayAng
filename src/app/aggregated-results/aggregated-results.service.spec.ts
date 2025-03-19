import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AggregatedResultsService } from './aggregated-results.service';
import { AggregatedResult, ProgressMetrics } from './aggregated-results.model';

describe('AggregatedResultsService', () => {
  let service: AggregatedResultsService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-jwt-token';
  const mockTokenObj = { token: mockToken };

  const mockAggregatedResults: AggregatedResult[] = [
    {
      employeeId: 1,
      employeeName: 'John Doe',
      skillAssessmentPercentage: 80,
      careerPathProgressPercentage: 70,
      trainingProgramsCount: 5,
      incompleteGoalsCount: 2,
    },
    {
      employeeId: 2,
      employeeName: 'Jane Smith',
      skillAssessmentPercentage: 90,
      careerPathProgressPercentage: 85,
      trainingProgramsCount: 3,
      incompleteGoalsCount: 1,
    },
  ];

  const mockProgressMetrics: ProgressMetrics = {
    skillAssessmentProgress: 80,
    careerPathProgress: 70,
    trainingProgress: 60,
    goalProgress: 50,
    careerPathProgressDetails: [
      {
        careerPathName: 'Software Engineer',
        totalSteps: 10,
        completedSteps: 7,
        progressPercentage: 70,
      },
    ],
    skillAssessmentDetails: [
      {
        skillName: 'Angular',
        score: 8,
        maxScore: 10,
        progressPercentage: 80,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AggregatedResultsService],
    });

    service = TestBed.inject(AggregatedResultsService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockTokenObj));
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    it('should return the token from localStorage', () => {
      const token = service.getToken();
      expect(token).toBe(JSON.stringify(mockTokenObj));
    });

    it('should return null if no token is found', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      const token = service.getToken();
      expect(token).toBeNull();
    });
  });

  describe('isLoggedin', () => {
    it('should return true if a token exists', () => {
      expect(service.isLoggedin()).toBeTrue();
    });

    it('should return false if no token exists', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      expect(service.isLoggedin()).toBeFalse();
    });
  });

  describe('getAggregatedResults', () => {
    it('should fetch aggregated results with authorization header', () => {
      service.getAggregatedResults().subscribe((results) => {
        expect(results).toEqual(mockAggregatedResults);
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/aggregated-results`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

      req.flush(mockAggregatedResults);
    });

    it('should handle errors when fetching aggregated results', () => {
      service.getAggregatedResults().subscribe({
        next: () => fail('Expected an error, but got a successful response'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/aggregated-results`);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getRankedAggregatedResults', () => {
    it('should fetch and rank aggregated results', () => {
      service.getRankedAggregatedResults().subscribe((results) => {
        expect(results.length).toBe(2);
        expect(results[0].employeeName).toBe('Jane Smith'); // Jane has a higher ranking score
        expect(results[1].employeeName).toBe('John Doe');
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/aggregated-results`);
      req.flush(mockAggregatedResults);
    });

    it('should handle errors when ranking aggregated results', () => {
      service.getRankedAggregatedResults().subscribe({
        next: () => fail('Expected an error, but got a successful response'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/aggregated-results`);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getProgressMetrics', () => {
    it('should fetch progress metrics with authorization header', () => {
      service.getProgressMetrics().subscribe((metrics) => {
        expect(metrics).toEqual(mockProgressMetrics);
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/progress-metrics`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

      req.flush(mockProgressMetrics);
    });

    it('should handle errors when fetching progress metrics', () => {
      service.getProgressMetrics().subscribe({
        next: () => fail('Expected an error, but got a successful response'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/progress-metrics`);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getReports', () => {
    it('should fetch reports for a specific employee', () => {
      const employeeId = 1;
      service.getReports(employeeId).subscribe((report) => {
        expect(report).toEqual(mockProgressMetrics);
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/reports/${employeeId}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

      req.flush(mockProgressMetrics);
    });

    it('should handle errors when fetching reports', () => {
      const employeeId = 1;
      service.getReports(employeeId).subscribe({
        next: () => fail('Expected an error, but got a successful response'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/reports/${employeeId}`);
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('generateReport', () => {
    it('should generate a report for a specific employee', () => {
      const employeeId = 1;
      const mockBlob = new Blob(['mock data'], { type: 'application/pdf' });

      service.generateReport(employeeId).subscribe((blob) => {
        expect(blob).toEqual(mockBlob);
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/reports/${employeeId}/download`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
      expect(req.request.responseType).toBe('blob');

      req.flush(mockBlob);
    });

    it('should handle errors when generating a report', () => {
      const employeeId = 1;
      service.generateReport(employeeId).subscribe({
        next: () => fail('Expected an error, but got a successful response'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne(`${service['aggregatedResultsUrl']}/reports/${employeeId}/download`);
      req.error(new ProgressEvent('Network error'));
    });
  });
});
