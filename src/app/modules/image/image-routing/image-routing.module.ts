import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SingleImageComponent } from '../components/single-image/single-image.component';
import { AllImagesComponent } from '../components/all-images/all-images.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';

let imageRoutes: Routes = [
  {
    path: "view/:id",
    component: SingleImageComponent
  },
  {
    path: "category/:id",
    component: AllImagesComponent
  },
  {
    path: '',
    component: AllImagesComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(imageRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
