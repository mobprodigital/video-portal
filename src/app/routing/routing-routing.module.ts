import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NotFoundComponent } from '../modules/shared/components/not-found/not-found.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from '../components/terms-conditions/terms-conditions.component';
// import { AuthVideoGuard } from '../auth/video-auth/auth-video.guard';

const routes: Routes = [

  {
    path: 'video',
    // canActivate: [AuthVideoGuard],
    loadChildren: '../modules/video/video.module#VideoModule'
  },
  {
    path: 'image',
    loadChildren: '../modules/image/image.module#ImageModule'
  },
  {
    path: 'about-us',
    component: AboutComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsConditionsComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
