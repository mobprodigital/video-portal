import { Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VideoModel } from '../../../../models/video.model';
import { CategoryModel } from '../../../../models/category.model';
import { VideoService } from '../../../../services/video/video.service';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd } from '@angular/router';
import { CategoryService } from '../../../../services/categories/category.service';


@Component({
  selector: 'app-all-video',
  templateUrl: './all-video.component.html',
  styleUrls: ['./all-video.component.css'],
  providers: [VideoService]
})

export class AllVideoComponent implements OnInit, OnDestroy {
  allVideos: VideoModel[] = [];
  selectedCatTab: string = 'all';
  pageTitle: string = 'Videos';
  initalVideoLoaded: boolean = false;
  videoCategoryList: CategoryModel[];

  canLazyLoad: boolean = true;

  @ViewChild('videosContainerRef', { read: ElementRef }) videosContainerRef: ElementRef;



  constructor(
    private _videoService: VideoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService
  ) {

    this._router.events.subscribe(async e => {
      if (e instanceof NavigationStart) {

      }

      if (e instanceof NavigationEnd) {
        let catId: any = this._activatedRoute.snapshot.paramMap.get('id');
        try {
          this.selectedCatTab = catId ? atob(catId) : 'all';
          this.showCat(this.selectedCatTab);
        }
        catch (err) {
          this.showCat(this.selectedCatTab);
        }
      }

    });

    /* let catId: any = this._activatedRoute.snapshot.params['id'];
    try {
      this.selectedCatTab = catId ? atob(catId) : 'all';
      this.showCat(this.selectedCatTab);
    }
    catch (err) {
      this.showCat(this.selectedCatTab);
    } */
    this.getVideoAndCategories();

  }



  ngOnInit() {
  }

  ngOnDestroy() {

  }

  private getVideoAndCategories() {
    Promise.all([this._categoryService.getSubCategoriesById('2'), this.getVideosByCategory()]).then(data => {
      this.allVideos = data[1];
      this.videoCategoryList = data[0];
      this.showCat(this.selectedCatTab);
      this.initalVideoLoaded = true;
    }).catch(err => alert(err));
  }

  private getVideosByCategory(categoryIdArr: string[] = [], fromIndex: number = 0, count: number = 10): Promise<VideoModel[]> {
    return this._videoService.getVideoByCategoryId(categoryIdArr, fromIndex, count);
  }

  public showVideoByCategory(categoryId: string) {
    this._router.navigate(['/video/category', categoryId]);
  }

  /**
   * Navigate to play video page and play a video 
   * @param videoId video id
   */
  public playVideo(ev: MouseEvent, videoId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this._router.navigate(['video/play', videoId]);
  }

  public showCat(catId: string) {
    this.selectedCatTab = catId ? catId : 'all';
    if (catId === 'all') {
      this.allVideos.forEach(async (vid) => { vid.hidden = false });
    }
    else {
      this.allVideos.forEach(async (vid) => vid.hidden = vid.categoryId.find(vidCat => vidCat.categoryId == catId) ? false : true);
    }
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    try {
      let videosContainer: HTMLDivElement = this.videosContainerRef.nativeElement;
      let windowHeight: number = window.outerHeight;
      let bottomOffset = videosContainer.getBoundingClientRect().bottom - windowHeight;
      if (this.initalVideoLoaded) {
        if (bottomOffset < 0 && this.canLazyLoad) {
          this.canLazyLoad = false;
          let catArr: string[] = [];
          let fromIndexVideo: number = this.allVideos.length;
          let videoCount: number = 10;

          if (this.selectedCatTab !== 'all') {
            catArr = [this.selectedCatTab];
            fromIndexVideo = this.calculateCategoryVideoLength(this.selectedCatTab);
          }

          this.getVideosByCategory(catArr, fromIndexVideo, videoCount).then(vidData => {
            this.canLazyLoad = true;
            this.allVideos.push(...vidData);

          }).catch(err => {
            this.canLazyLoad = true;

          });

        }
      }

    }
    catch (err) {
      alert(err);
    }


  }


  private calculateCategoryVideoLength(catId: string): number {
    let len = this.allVideos.filter(vid => vid.categoryId.some(cat => cat.categoryId == catId)).length;
    return len;
  }


}
