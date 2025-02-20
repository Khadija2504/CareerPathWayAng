import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorShipRoutingModule } from './mentor-ship-routing.module';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MentorsListComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MentorShipRoutingModule,
  ReactiveFormsModule
  ]
})
export class MentorShipModule { }
