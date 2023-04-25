import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { PageWrapperComponent } from './layout/page-wrapper/page-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { AbmAlumnosModule } from './dashboard/pages/alumnos/abm-alumnos/abm-alumnos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    ToolbarComponent,
    PageWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AbmAlumnosModule,
    BrowserAnimationsModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
