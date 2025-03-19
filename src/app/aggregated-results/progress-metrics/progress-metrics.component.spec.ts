import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProgressMetricsComponent } from './progress-metrics.component';
import { AggregatedResultsService } from '../aggregated-results.service';
import { ProgressMetrics, CareerPathProgressDetail, SkillAssessmentDetail } from '../aggregated-results.model';
import { ChartConfiguration } from 'chart.js';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProgressMetricsComponent', () => {
  let component: ProgressMetricsComponent;
  let fixture: ComponentFixture<ProgressMetricsComponent>;
  let progressService: jasmine.SpyObj<AggregatedResultsService>;

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
    const spy = jasmine.createSpyObj('AggregatedResultsService', ['getProgressMetrics']);

    TestBed.configureTestingModule({
      declarations: [ProgressMetricsComponent],
      providers: [{ provide: AggregatedResultsService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ProgressMetricsComponent);
    component = fixture.componentInstance;
    progressService = TestBed.inject(AggregatedResultsService) as jasmine.SpyObj<AggregatedResultsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load progress metrics and initialize chart data', () => {
      progressService.getProgressMetrics.and.returnValue(of(mockProgressMetrics));

      fixture.detectChanges();

      expect(component.isLoading).toBeFalse();
      expect(component.progressMetrics).toEqual(mockProgressMetrics);
      expect(component.careerPathDetails).toEqual(mockProgressMetrics.careerPathProgressDetails);
      expect(component.skillDetails).toEqual(mockProgressMetrics.skillAssessmentDetails);

      expect(component.barChartData.labels).toEqual(['Skill Assessment', 'Career Path', 'Training', 'Goals']);
      expect(component.barChartData.datasets[0].data).toEqual([
        mockProgressMetrics.skillAssessmentProgress,
        mockProgressMetrics.careerPathProgress,
        mockProgressMetrics.trainingProgress,
        mockProgressMetrics.goalProgress,
      ]);
      expect(component.barChartData.datasets[0].label).toBe('Progress (%)');
      expect(component.barChartData.datasets[0].backgroundColor).toEqual([
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
      ]);

      expect(component.totalTrainingsCompleted).toBe(6);
      expect(component.totalGoalsCompleted).toBe(3);
    });

    it('should handle error when loading progress metrics fails', () => {
      progressService.getProgressMetrics.and.returnValue(throwError(() => new Error('Failed to load')));

      fixture.detectChanges();

      expect(component.isLoading).toBeFalse();
      expect(component.progressMetrics).toBeNull();
      expect(component.barChartData.datasets.length).toBe(0);
    });
  });

  describe('Chart Configuration', () => {
    it('should have correct bar chart options', () => {
      expect(component.barChartOptions).toBeDefined();
      const yAxis = component.barChartOptions?.scales?.['y'];
      expect(yAxis).toBeDefined();

      if (yAxis && 'beginAtZero' in yAxis) {
        expect(yAxis.beginAtZero).toBeTrue();
      } else {
        fail('beginAtZero property not found in yAxis');
      }

      expect(yAxis?.max).toBe(100);

      if (yAxis?.ticks?.callback) {
        const callback = yAxis.ticks.callback;
        const mockScale = {} as any;
        expect(callback.call(mockScale, 50, 0, [])).toBe('50%');
      }
    });

    it('should have correct bar chart type and labels', () => {
      expect(component.barChartType).toBe('bar');
      expect(component.barChartLabels).toEqual(['Skill Assessment', 'Career Path', 'Training', 'Goals']);
    });
  });
});
