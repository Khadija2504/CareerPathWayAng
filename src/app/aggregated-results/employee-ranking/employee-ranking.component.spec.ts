import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { EmployeeRankingComponent } from './employee-ranking.component';
import { AggregatedResultsService } from '../aggregated-results.service';
import { AggregatedResult } from '../aggregated-results.model';

describe('EmployeeRankingComponent', () => {
  let component: EmployeeRankingComponent;
  let fixture: ComponentFixture<EmployeeRankingComponent>;
  let aggregatedResultsService: jasmine.SpyObj<AggregatedResultsService>;

  const mockRankedEmployees: AggregatedResult[] = [
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
    {
      employeeId: 3,
      employeeName: 'Alice Johnson',
      skillAssessmentPercentage: 85,
      careerPathProgressPercentage: 80,
      trainingProgramsCount: 4,
      incompleteGoalsCount: 0,
      rankingScore: 92,
    },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AggregatedResultsService', [
      'getRankedAggregatedResults',
    ]);

    TestBed.configureTestingModule({
      declarations: [EmployeeRankingComponent],
      providers: [{ provide: AggregatedResultsService, useValue: spy }],
    });

    fixture = TestBed.createComponent(EmployeeRankingComponent);
    component = fixture.componentInstance;
    aggregatedResultsService = TestBed.inject(
      AggregatedResultsService,
    ) as jasmine.SpyObj<AggregatedResultsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load ranked employees on initialization', () => {
      aggregatedResultsService.getRankedAggregatedResults.and.returnValue(of(mockRankedEmployees));

      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.isLoading).toBeFalse();
      expect(component.rankedEmployees).toEqual(mockRankedEmployees);
      expect(aggregatedResultsService.getRankedAggregatedResults).toHaveBeenCalled();
    });

    it('should handle error when loading ranked employees fails', () => {
      aggregatedResultsService.getRankedAggregatedResults.and.returnValue(throwError(() => new Error('Failed to load')));

      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.isLoading).toBeFalse();
      expect(component.rankedEmployees).toEqual([]);
      expect(aggregatedResultsService.getRankedAggregatedResults).toHaveBeenCalled();
    });
  });

  describe('getBadge', () => {
    it('should return 🥇 for index 0', () => {
      const badge = component.getBadge(0);
      expect(badge).toBe('🥇');
    });

    it('should return 🥈 for index 1', () => {
      const badge = component.getBadge(1);
      expect(badge).toBe('🥈');
    });

    it('should return 🥉 for index 2', () => {
      const badge = component.getBadge(2);
      expect(badge).toBe('🥉');
    });

    it('should return an empty string for index 3 or higher', () => {
      const badge = component.getBadge(3);
      expect(badge).toBe('');
    });
  });
});
