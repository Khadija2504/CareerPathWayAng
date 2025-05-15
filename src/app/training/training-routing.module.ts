import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { ManageTrainingStepsComponent } from './manage-training-steps/manage-training-steps.component';

const routes: Routes = [
  {path: '', component: TrainingProgramComponent},
  {path: 'manag-training-programs', component: ManageTrainingStepsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
