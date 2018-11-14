import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { VideoService } from '../../../../services/video/video.service';
import { VideoModel } from '../../../../models/video.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  public searchTerm: string = '';
  public pageTitle: string = 'Search result';
  public allVideos: VideoModel[] = [];
  public notFoundMessage: string = '';
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _videoService: VideoService) {
    this._router.events.subscribe(async e => {
      /* if (e instanceof NavigationStart) {

      } */

      if (e instanceof NavigationEnd) {
        this.searchTerm = this._activatedRoute.snapshot.params['searchTerm'];
        console.log('search term : ', this.searchTerm);

        this.pageTitle = 'Search results for, <i>' + this.searchTerm + '</i>';

        this._videoService.search(this.searchTerm).then(vdo => {
          this.allVideos = vdo;
        }).catch(err => this.notFoundMessage = err);
      }

    });
  }

  ngOnInit() {

  }

  public playVideo(ev: MouseEvent, videoId: number) {
    ev.preventDefault();
    ev.stopPropagation();
    this._router.navigate(['video/play', videoId]);
  }

}
