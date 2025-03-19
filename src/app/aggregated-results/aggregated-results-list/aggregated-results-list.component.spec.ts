import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AggregatedResultsListComponent } from './aggregated-results-list.component';
import { AggregatedResultsService } from '../aggregated-results.service';
import { AggregatedResult, ProgressMetrics, CareerPathProgressDetail, SkillAssessmentDetail } from '../aggregated-results.model';

describe('AggregatedResultsListComponent', () => {
  let component: AggregatedResultsListComponent;
  let fixture: ComponentFixture<AggregatedResultsListComponent>;
  let aggregatedResultsService: jasmine.SpyObj<AggregatedResultsService>;

  const mockAggregatedResults: AggregatedResult[] = [
    {
      employeeId: 1,
      employeeName: 'John Doe',
      skillAssessmentPercentage: 80,
      careerPathProgressPercentage: 70,
      trainingProgramsCount: 5,
      incompleteGoalsCount: 2,
      rankingScore: 90,
    },
    {
      employeeId: 2,
      employeeName: 'Jane Smith',
      skillAssessmentPercentage: 90,
      careerPathProgressPercentage: 85,
      trainingProgramsCount: 3,
      incompleteGoalsCount: 1,
      rankingScore: 95,
    },
  ];

  const mockEmployeeReport: ProgressMetrics = {
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
    const spy = jasmine.createSpyObj('AggregatedResultsService', [
      'getAggregatedResults',
      'getReports',
      'generateReport',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AggregatedResultsListComponent],
      providers: [{ provide: AggregatedResultsService, useValue: spy }],
    });

    fixture = TestBed.createComponent(AggregatedResultsListComponent);
    component = fixture.componentInstance;
    aggregatedResultsService = TestBed.inject(
      AggregatedResultsService,
    ) as jasmine.SpyObj<AggregatedResultsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load aggregated results on initialization', () => {
      aggregatedResultsService.getAggregatedResults.and.returnValue(of(mockAggregatedResults));

      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.isLoading).toBeFalse();
      expect(component.aggregatedResults).toEqual(mockAggregatedResults);
      expect(aggregatedResultsService.getAggregatedResults).toHaveBeenCalled();
    });

    it('should handle error when loading aggregated results fails', () => {
      aggregatedResultsService.getAggregatedResults.and.returnValue(throwError(() => new Error('Failed to load')));

      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.isLoading).toBeFalse();
      expect(component.aggregatedResults).toEqual([]);
      expect(aggregatedResultsService.getAggregatedResults).toHaveBeenCalled();
    });
  });

  describe('loadEmployeeReport', () => {
    it('should load employee report and open modal', () => {
      aggregatedResultsService.getReports.and.returnValue(of(mockEmployeeReport));

      component.loadEmployeeReport(1);

      expect(component.isReportLoading).toBeFalse();
      expect(component.showReportModal).toBeTrue();
      expect(component.selectedEmployeeReport).toEqual(mockEmployeeReport);
      expect(aggregatedResultsService.getReports).toHaveBeenCalledWith(1);
    });

    it('should handle error when loading employee report fails', () => {
      aggregatedResultsService.getReports.and.returnValue(throwError(() => new Error('Failed to load')));

      component.loadEmployeeReport(1);

      expect(component.isReportLoading).toBeFalse();
      expect(component.showReportModal).toBeTrue();
      expect(component.selectedEmployeeReport).toBeNull();
      expect(aggregatedResultsService.getReports).toHaveBeenCalledWith(1);
    });
  });

  describe('closeReportModal', () => {
    it('should close the report modal and reset selected report', () => {
      component.showReportModal = true;
      component.selectedEmployeeReport = mockEmployeeReport;

      component.closeReportModal();

      expect(component.showReportModal).toBeFalse();
      expect(component.selectedEmployeeReport).toBeNull();
    });
  });

  describe('downloadReport', () => {
    it('should download the employee report as a PDF', () => {
      const mockBlob = new Blob(['mock data'], { type: 'application/pdf' });
      aggregatedResultsService.generateReport.and.returnValue(of(mockBlob));

      spyOn(window.URL, 'createObjectURL').and.callThrough();
      spyOn(window.URL, 'revokeObjectURL').and.callThrough();

      component.downloadReport(1);

      expect(aggregatedResultsService.generateReport).toHaveBeenCalledWith(1);
      expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('should handle error when downloading report fails', () => {
      aggregatedResultsService.generateReport.and.returnValue(throwError(() => new Error('Failed to download')));

      component.downloadReport(1);

      expect(aggregatedResultsService.generateReport).toHaveBeenCalledWith(1);
    });
  });
});
