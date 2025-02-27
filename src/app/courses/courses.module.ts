import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListComponent } from './course-list-component/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
