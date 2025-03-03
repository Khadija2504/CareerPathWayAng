import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';

const routes: Routes = [
  {path: '', component: ResourcesListComponent},
  {path: 'resource-form', component: AddResourceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
