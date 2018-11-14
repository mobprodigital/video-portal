import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllVideoComponent } from '../components/all-video/all-video.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { PlayVideoComponent } from '../components/play-video/play-video.component';
import { SearchResultComponent } from '../components/search-result/search-result.component';

let videoRoutes: Routes = [
  {
    path: "play/:id",
    component: PlayVideoComponent
  },
  {
    path: "category/:id",
    component: AllVideoComponent
  },
  {
    path: "search/:searchTerm",
    component: SearchResultComponent
  },
  {
    path: '',
    component: AllVideoComponent,
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
    RouterModule.forChild(videoRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
