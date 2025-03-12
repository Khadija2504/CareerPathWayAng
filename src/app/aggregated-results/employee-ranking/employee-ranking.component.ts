import { Component, OnInit } from '@angular/core';
import { AggregatedResult } from '../aggregated-results.model';
import { AggregatedResultsService } from '../aggregated-results.service';

@Component({
  selector: 'app-employee-ranking',
  standalone: false,
  templateUrl: './employee-ranking.component.html',
  styleUrl: './employee-ranking.component.css'
})
export class EmployeeRankingComponent implements OnInit {
  rankedEmployees: AggregatedResult[] = [];
  isLoading = true;

  constructor(private aggregatedResultsService: AggregatedResultsService) {}

  ngOnInit(): void {
    this.loadRankedEmployees();
  }

  private loadRankedEmployees(): void {
    this.aggregatedResultsService.getRankedAggregatedResults().subscribe({
      next: (data) => {
        this.rankedEmployees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching ranked employees:', err);
        this.isLoading = false;
      }
    });
  }

  getBadge(index: number): string {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '';
    }
  }
}
