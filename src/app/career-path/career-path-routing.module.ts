import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCareerPathComponent } from './create-career-path/create-career-path.component';

const routes: Routes = [
  {path: '', component: CreateCareerPathComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerPathRoutingModule { }
