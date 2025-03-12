import { Component, OnInit } from '@angular/core';
import { AggregatedResultsService } from '../aggregated-results.service';
import { AggregatedResult } from '../aggregated-results.model';

@Component({
  selector: 'app-aggregated-results-list',
  standalone: false,
  templateUrl: './aggregated-results-list.component.html',
  styleUrl: './aggregated-results-list.component.css'
})
export class AggregatedResultsListComponent implements OnInit {
  aggregatedResults: AggregatedResult[] = [];
  isLoading = true;

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
}
