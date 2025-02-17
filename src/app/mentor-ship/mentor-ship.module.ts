import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorShipRoutingModule } from './mentor-ship-routing.module';
import { MentorsListComponent } from './mentors-list/mentors-list.component';


@NgModule({
  declarations: [
    MentorsListComponent
  ],
  imports: [
    CommonModule,
    MentorShipRoutingModule
  ]
})
export class MentorShipModule { }
