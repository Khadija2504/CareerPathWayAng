import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list-component/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

const routes: Routes = [
  {path: '', component: CourseListComponent},
  {path: 'add-course', component: AddCourseComponent},
  {path: 'update-course/:courseId', component: UpdateCourseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
