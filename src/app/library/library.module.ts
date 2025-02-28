import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';


@NgModule({
  declarations: [
    ResourcesListComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
