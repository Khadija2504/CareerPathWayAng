import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillAssessmentComponent } from './skill-assessment.component';
import { InteractiveQuestionnairesComponent } from './interactive-questionnaires/interactive-questionnaires.component';

const routes: Routes = [
  {path: '', component: SkillAssessmentComponent},
  {path: 'interactive-questionnaires/:id', component: InteractiveQuestionnairesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillAssessmentRoutingModule { }
