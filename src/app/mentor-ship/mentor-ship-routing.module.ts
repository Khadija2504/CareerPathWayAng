import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { ChatComponent } from './chat/chat.component';
import { MentorshipsListComponent } from './mentorships-list/mentorships-list.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {path: 'mentors-list', component: MentorsListComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: 'chat', component: ChatComponent},
  {path: 'mentorships-list', component: MentorshipsListComponent, canActivate: [RoleGuard], data: { expectedRole: 'MENTOR' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorShipRoutingModule { }
