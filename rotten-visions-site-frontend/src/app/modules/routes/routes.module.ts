import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//All components
import { AppComponent } from '../../app.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { BlogsComponent } from '../../components/blogs/blogs.component';
import { ContactUsComponent } from '../../components/contact-us/contact-us.component';
import { HomeComponent } from '../../components/home/home.component';

const appRoutes : Routes = [
	{ path : '', component : HomeComponent },
	{ path : 'home', component : HomeComponent },
	{ path : 'about', component : AboutUsComponent },
	{ path : 'projects', component : ProjectsComponent },
	{ path : 'blogs', component : BlogsComponent },
	{ path : 'contacts-us', component : ContactUsComponent }
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot( appRoutes )
  ],
  declarations: [],
  exports : [ RouterModule ] 
})
export class RoutesModule { }
