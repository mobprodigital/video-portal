import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AllVideoComponent } from './components/all-video/all-video.component';
import { VideoRoutingModule } from './video-routing/video-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VideoSidebarComponent } from './components/video-sidebar/video-sidebar.component';
import { HttpModule } from '@angular/http';
import { AjaxService } from '../../services/ajax/ajax.service';
import { PlayVideoComponent } from './components/play-video/play-video.component';
import { VideoService } from '../../services/video/video.service';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    HttpModule,
    FormsModule
  ],
  declarations: [ AllVideoComponent, VideoSidebarComponent, PlayVideoComponent, SearchResultComponent],
  exports: [VideoRoutingModule,FormsModule, SharedModule, HttpModule],
  providers: [AjaxService, VideoService]
})
export class VideoModule { }
