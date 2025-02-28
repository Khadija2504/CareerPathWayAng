import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { ChatComponent } from './chat/chat.component';
import { MentorshipsListComponent } from './mentorships-list/mentorships-list.component';

const routes: Routes = [
  {path: 'mentors-list', component: MentorsListComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'mentorships-list', component: MentorshipsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorShipRoutingModule { }
