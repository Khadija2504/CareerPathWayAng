import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)},
  {path: 'error', loadChildren: () => import('./errors/errors.module').then(m=> m.ErrorsModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m=> m.ProfileModule)},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
