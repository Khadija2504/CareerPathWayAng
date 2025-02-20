import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: 'mentors-list', component: MentorsListComponent},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorShipRoutingModule { }
