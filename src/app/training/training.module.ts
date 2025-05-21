import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingProgramComponent } from './training-program/training-program.component';
import { ManageTrainingStepsComponent } from './manage-training-steps/manage-training-steps.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrainingProgramComponent,
    ManageTrainingStepsComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TrainingModule { }
