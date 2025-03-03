import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {path: '', component: ResourcesListComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE'}},
  {path: 'resource-form', component: AddResourceComponent, canActivate: [RoleGuard], data: {expectedRole: 'ADMIN'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
