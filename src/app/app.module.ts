import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmplyeeNavComponent } from './nav/emplyee-nav/emplyee-nav.component';
import { MentorNavComponent } from './nav/mentor-nav/mentor-nav.component';
import { AdminNavComponent } from './nav/admin-nav/admin-nav.component';
import { SkillAssessmentComponent } from './skill-assessment/skill-assessment.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faEdit, faTrash);
  }
}
