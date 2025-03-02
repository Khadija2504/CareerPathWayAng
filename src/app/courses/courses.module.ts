import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListComponent } from './course-list-component/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    UpdateCourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class CoursesModule { }
