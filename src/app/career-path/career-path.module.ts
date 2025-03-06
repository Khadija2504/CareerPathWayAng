import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerPathRoutingModule } from './career-path-routing.module';
import { CreateCareerPathComponent } from './create-career-path/create-career-path.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CareerPathsListComponent } from './career-paths-list/career-paths-list.component';


@NgModule({
  declarations: [
    CreateCareerPathComponent,
    CareerPathsListComponent
  ],
  imports: [
    CommonModule,
    CareerPathRoutingModule,
    ReactiveFormsModule
  ]
})
export class CareerPathModule { }
