import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { GoalsComponent } from './goals/goals.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {path: '', component: UserDetailsComponent},
  {path: 'edit-profile', component: UpdateProfileComponent},
  {path: 'addGoal', component: AddGoalsComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: 'goals', component: GoalsComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  { path: 'edit-goal/:goalId', component: EditGoalComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
