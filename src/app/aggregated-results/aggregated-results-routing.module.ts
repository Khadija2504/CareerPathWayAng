import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregatedResultsListComponent } from './aggregated-results-list/aggregated-results-list.component';

const routes: Routes = [
  {path: '', component: AggregatedResultsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatedResultsRoutingModule { }
