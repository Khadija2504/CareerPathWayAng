import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregatedResultsRoutingModule } from './aggregated-results-routing.module';
import { AggregatedResultsListComponent } from './aggregated-results-list/aggregated-results-list.component';


@NgModule({
  declarations: [
    AggregatedResultsListComponent
  ],
  imports: [
    CommonModule,
    AggregatedResultsRoutingModule
  ]
})
export class AggregatedResultsModule { }
