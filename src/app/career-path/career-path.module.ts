import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerPathRoutingModule } from './career-path-routing.module';
import { CreateCareerPathComponent } from './create-career-path/create-career-path.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateCareerPathComponent
  ],
  imports: [
    CommonModule,
    CareerPathRoutingModule,
    ReactiveFormsModule
  ]
})
export class CareerPathModule { }
