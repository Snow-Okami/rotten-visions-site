import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

import { RoutesModule } from './modules/routes/routes.module';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './services/data.service'

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ProjectsComponent,
    FooterComponent,
    BlogsComponent,
    ContactUsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule
  ],
  exports: [ RouterModule ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
