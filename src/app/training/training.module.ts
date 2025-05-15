import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { ManageTrainingStepsComponent } from './manage-training-steps/manage-training-steps.component';


@NgModule({
  declarations: [
    TrainingProgramComponent,
    ManageTrainingStepsComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule { }
