import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsListComponent } from './mentors-list/mentors-list.component';

const routes: Routes = [
  {path: 'mentors-list', component: MentorsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorShipRoutingModule { }
