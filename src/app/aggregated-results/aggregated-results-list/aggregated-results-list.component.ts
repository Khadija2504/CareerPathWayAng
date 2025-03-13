import { Component, OnInit } from '@angular/core';
import { AggregatedResultsService } from '../aggregated-results.service';
import { AggregatedResult, CareerPathProgressDetail, ProgressMetrics, SkillAssessmentDetail } from '../aggregated-results.model';

@Component({
  selector: 'app-aggregated-results-list',
  standalone: false,
  templateUrl: './aggregated-results-list.component.html',
  styleUrls: ['./aggregated-results-list.component.css']
})
export class AggregatedResultsListComponent implements OnInit {
  aggregatedResults: AggregatedResult[] = [];
  selectedEmployeeReport: ProgressMetrics | null = null;
  isLoading = true;
  isReportLoading = false;
  showReportModal = false;

  constructor(private aggregatedResultsService: AggregatedResultsService) {}

  ngOnInit(): void {
    this.loadAggregatedResults();
  }

  private loadAggregatedResults(): void {
    this.aggregatedResultsService.getAggregatedResults().subscribe({
      next: (data) => {
        this.aggregatedResults = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching aggregated results:', err);
        this.isLoading = false;
      }
    });
  }

  loadEmployeeReport(employeeId: number): void {
    this.isReportLoading = true;
    this.showReportModal = true;

    this.aggregatedResultsService.getReports(employeeId).subscribe({
      next: (data) => {
        this.selectedEmployeeReport = data;
        this.isReportLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employee report:', err);
        this.isReportLoading = false;
      }
    });
  }

  closeReportModal(): void {
    this.showReportModal = false;
    this.selectedEmployeeReport = null;
  }
}
