import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list-component/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {path: '', component: CourseListComponent, canActivate: [RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: 'add-course', component: AddCourseComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' }},
  {path: 'update-course/:courseId', component: UpdateCourseComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
