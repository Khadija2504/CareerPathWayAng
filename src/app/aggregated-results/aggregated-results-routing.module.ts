import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregatedResultsListComponent } from './aggregated-results-list/aggregated-results-list.component';
import { EmployeeRankingComponent } from './employee-ranking/employee-ranking.component';

const routes: Routes = [
  {path: '', component: AggregatedResultsListComponent},
  {path: 'ranking', component: EmployeeRankingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatedResultsRoutingModule { }
