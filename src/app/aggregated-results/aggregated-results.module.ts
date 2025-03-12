import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregatedResultsRoutingModule } from './aggregated-results-routing.module';
import { AggregatedResultsListComponent } from './aggregated-results-list/aggregated-results-list.component';
import { EmployeeRankingComponent } from './employee-ranking/employee-ranking.component';


@NgModule({
  declarations: [
    AggregatedResultsListComponent,
    EmployeeRankingComponent
  ],
  imports: [
    CommonModule,
    AggregatedResultsRoutingModule
  ]
})
export class AggregatedResultsModule { }
