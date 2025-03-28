import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerPathRoutingModule } from './career-path-routing.module';
import { CreateCareerPathComponent } from './create-career-path/create-career-path.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CareerPathsListComponent } from './career-paths-list/career-paths-list.component';
import { UpdateCareerPathComponent } from './update-career-path/update-career-path.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeUrlPipe } from './safe-url.pipe';


@NgModule({
  declarations: [
    CreateCareerPathComponent,
    CareerPathsListComponent,
    UpdateCareerPathComponent,
  ],
  imports: [
    CommonModule,
    CareerPathRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    SafeUrlPipe
  ]
})
export class CareerPathModule {
  constructor() {
      library.add(faTrash);
    }
}
