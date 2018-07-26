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
import { DataService } from './services/data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import {TooltipModule} from "ngx-tooltip";

import { TooltipModule } from 'ng2-tooltip-directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ProjectsComponent,
    FooterComponent,
    BlogsComponent,
    ContactUsComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TooltipModule,
    RoutesModule
  ],
  exports: [ RouterModule ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
