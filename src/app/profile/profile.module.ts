import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { TruncatePipe } from './user-details/truncate.pipe';
import { GoalsComponent } from './goals/goals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UpdateProfileComponent,
    AddGoalsComponent,
    TruncatePipe,
    GoalsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ProfileModule {
  constructor() {
    library.add(faEdit, faTrash);
  }
}
