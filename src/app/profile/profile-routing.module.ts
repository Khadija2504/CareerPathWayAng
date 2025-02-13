import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {path: '', component: UserDetailsComponent},
  {path: 'edit-profile', component: UpdateProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
