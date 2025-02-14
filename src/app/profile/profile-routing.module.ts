import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddGoalsComponent } from './add-goals/add-goals.component';

const routes: Routes = [
  {path: '', component: UserDetailsComponent},
  {path: 'edit-profile', component: UpdateProfileComponent},
  {path: 'addGoal', component: AddGoalsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
