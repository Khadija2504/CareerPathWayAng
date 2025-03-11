import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorShipRoutingModule } from './mentor-ship-routing.module';
import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MentorshipsListComponent } from './mentorships-list/mentorships-list.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';


@NgModule({
  declarations: [
    MentorsListComponent,
    ChatComponent,
    MentorshipsListComponent,
    FeedbackFormComponent
  ],
  imports: [
    CommonModule,
    MentorShipRoutingModule,
  ReactiveFormsModule
  ]
})
export class MentorShipModule { }
