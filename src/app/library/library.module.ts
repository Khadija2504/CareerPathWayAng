import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResourcesListComponent,
    AddResourceComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule
  ]
})
export class LibraryModule { }
