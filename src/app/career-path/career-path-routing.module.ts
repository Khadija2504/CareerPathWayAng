import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCareerPathComponent } from './create-career-path/create-career-path.component';
import { CareerPathsListComponent } from './career-paths-list/career-paths-list.component';
import { RoleGuard } from '../auth/role.guard';
import { UpdateCareerPathComponent } from './update-career-path/update-career-path.component';

const routes: Routes = [
  {path: 'list', component: CreateCareerPathComponent, canActivate: [RoleGuard], data: {expectedRole: 'ADMIN'}},
  {path: 'update/:careerPathId', component: UpdateCareerPathComponent, canActivate: [RoleGuard], data: {expectedRole: 'ADMIN'}},
  {path: '', component: CareerPathsListComponent, canActivate: [RoleGuard], data: {expectedRole: 'EMPLOYEE'}},
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerPathRoutingModule { }
