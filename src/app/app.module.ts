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

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EmplyeeNavComponent,
    MentorNavComponent,
    AdminNavComponent,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faEdit, faTrash);
  }
}
