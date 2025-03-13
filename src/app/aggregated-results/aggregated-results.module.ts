import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregatedResultsRoutingModule } from './aggregated-results-routing.module';
import { AggregatedResultsListComponent } from './aggregated-results-list/aggregated-results-list.component';
import { EmployeeRankingComponent } from './employee-ranking/employee-ranking.component';
import { ProgressMetricsComponent } from './progress-metrics/progress-metrics.component';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    AggregatedResultsListComponent,
    EmployeeRankingComponent,
    ProgressMetricsComponent
  ],
  imports: [
    CommonModule,
    AggregatedResultsRoutingModule,
    BaseChartDirective
  ]
})
export class AggregatedResultsModule { }
