import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillAssessmentRoutingModule } from './skill-assessment-routing.module';
import { InteractiveQuestionnairesComponent } from './interactive-questionnaires/interactive-questionnaires.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from '../profile/profile-routing.module';


@NgModule({
  declarations: [
    InteractiveQuestionnairesComponent
  ],
  imports: [
    CommonModule,
    SkillAssessmentRoutingModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SkillAssessmentModule { }
