import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { ManageTrainingStepsComponent } from './manage-training-steps/manage-training-steps.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: '', component: TrainingProgramComponent, canActivate: [AuthGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: 'manag-training-programs/:menteeId', component: ManageTrainingStepsComponent, canActivate: [AuthGuard], data: { expectedRole: 'MENTOR' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
