import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionnaireListComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuestionnaireModule { }
