import { Component, OnInit } from '@angular/core';
import { AggregatedResultsService } from '../aggregated-results.service';
import { CareerPathProgressDetail, ProgressMetrics, SkillAssessmentDetail } from '../aggregated-results.model';
import { ChartConfiguration, ChartData, ChartType, LinearScale, BarController, BarElement, CategoryScale } from 'chart.js';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-progress-metrics',
  standalone: false,
  templateUrl: './progress-metrics.component.html',
  styleUrls: ['./progress-metrics.component.css'],
})
export class ProgressMetricsComponent implements OnInit {
  progressMetrics: ProgressMetrics | null = null;
  isLoading = true;
  
  careerPathDetails: CareerPathProgressDetail[] = [];
  skillDetails: SkillAssessmentDetail[] = [];

  constructor(private progressService: AggregatedResultsService) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale);
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (tickValue: number | string) => `${tickValue}%`,
        },
      },
    },
  };

  public barChartLabels = ['Skill Assessment', 'Career Path', 'Training', 'Goals'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [],
  };

  totalTrainingsCompleted: number = 0;
  totalGoalsCompleted: number = 0;

  ngOnInit(): void {
    this.loadProgressMetrics();
  }

  private loadProgressMetrics(): void {
    this.progressService.getProgressMetrics().subscribe({
      next: (data) => {
        this.progressMetrics = data;
        this.isLoading = false;

        this.careerPathDetails = data.careerPathProgressDetails;
        this.skillDetails = data.skillAssessmentDetails;

        this.barChartData = {
          labels: this.barChartLabels,
          datasets: [
            {
              data: [
                data.skillAssessmentProgress,
                data.careerPathProgress,
                data.trainingProgress,
                data.goalProgress,
              ],
              label: 'Progress (%)',
              backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
            },
          ],
        };

        this.totalTrainingsCompleted = Math.round(
          (data.trainingProgress / 100) * 10
        );
        this.totalGoalsCompleted = Math.round(
          (data.goalProgress / 100) * 5
        );
      },
      error: (err) => {
        console.error('Error fetching progress metrics:', err);
        this.isLoading = false;
      },
    });
  }
}
