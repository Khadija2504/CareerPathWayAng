import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { RoleGuard } from './auth/role.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)},
  {path: 'error', loadChildren: () => import('./errors/errors.module').then(m=> m.ErrorsModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m=> m.ProfileModule), canActivate: [AuthGuard]},
  {path: 'mentorShip-coaching', loadChildren: () => import('./mentor-ship/mentor-ship.module').then(m=> m.MentorShipModule), canActivate: [AuthGuard]},
  {path: 'notifications', loadChildren: ()=> import ('./notification/notification.module').then(m=> m.NotificationModule), canActivate: [AuthGuard]},
  {path: 'resources', loadChildren: ()=> import ('./library/library.module').then(m=> m.LibraryModule), canActivate: [AuthGuard]},
  {path: 'courses', loadChildren: ()=> import ('./courses/courses.module').then(m=> m.CoursesModule), canActivate: [AuthGuard]},
  {path: 'career-path', loadChildren: ()=> import ('./career-path/career-path.module').then(m=> m.CareerPathModule), canActivate: [AuthGuard]},
  {path: 'training-programs', loadChildren: ()=> import ('./training/training.module').then(m=> m.TrainingModule), canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: 'skills', loadChildren: () => import('./skill/skill.module').then(m=> m.SkillModule), canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' }},
  {path: 'aggregated-results', loadChildren: () => import('./aggregated-results/aggregated-results.module').then(m=> m.AggregatedResultsModule), canActivate: [AuthGuard]},
  {path: 'questionnaires', loadChildren: () => import('./questionnaire/questionnaire.module').then(m=> m.QuestionnaireModule), canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' }},
  {path: '', loadChildren: () => import('./home/home.module').then(m=> m.HomeModule)},
  {path: 'skill-assessment', loadChildren: () => import('./skill-assessment/skill-assessment.module').then(m=> m.SkillAssessmentModule), canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'EMPLOYEE' }},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
