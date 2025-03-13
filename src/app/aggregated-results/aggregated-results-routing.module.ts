import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregatedResultsListComponent } from './aggregated-results-list/aggregated-results-list.component';
import { EmployeeRankingComponent } from './employee-ranking/employee-ranking.component';
import { RoleGuard } from '../auth/role.guard';
import { ProgressMetricsComponent } from './progress-metrics/progress-metrics.component';

const routes: Routes = [
  {path: '', component: AggregatedResultsListComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' }},
  {path: 'ranking', component: EmployeeRankingComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: 'progress-tracking', component: ProgressMetricsComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatedResultsRoutingModule { }
