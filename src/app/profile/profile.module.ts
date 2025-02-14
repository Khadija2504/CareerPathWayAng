import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGoalsComponent } from './add-goals/add-goals.component';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UpdateProfileComponent,
    AddGoalsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
