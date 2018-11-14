import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { SingleImageComponent } from './components/single-image/single-image.component';
import { ImageRoutingModule } from './image-routing/image-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ImageSidebarComponent } from './components/image-sidebar/image-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    ImageRoutingModule,
    SharedModule
  ],
  declarations: [AllImagesComponent, SingleImageComponent, ImageSidebarComponent],
  exports: [ImageRoutingModule, SharedModule]
})
export class ImageModule { }
