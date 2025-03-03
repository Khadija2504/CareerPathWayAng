import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmplyeeNavComponent } from './nav/emplyee-nav/emplyee-nav.component';
import { MentorNavComponent } from './nav/mentor-nav/mentor-nav.component';
import { AdminNavComponent } from './nav/admin-nav/admin-nav.component';
import { SkillAssessmentComponent } from './skill-assessment/skill-assessment.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    SkillAssessmentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EmplyeeNavComponent,
    MentorNavComponent,
    AdminNavComponent,
    FontAwesomeModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faEdit, faTrash);
  }
}
