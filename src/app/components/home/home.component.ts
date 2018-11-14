import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VideoModel } from "../../models/video.model";
import { CategoryModel } from '../../models/category.model';
import { VideoService } from "../../services/video/video.service";
import { Router } from '@angular/router';
import { CategoryService } from '../../services/categories/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService, CategoryService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('imgSlider', { read: ElementRef }) imgSlider: ElementRef;
  @ViewChild('bannerBtnWrap', { read: ElementRef }) bannerBtnWrap: ElementRef;


  selectedSlide: number = null;
  bannerVideos: VideoModel[] = [];
  mostLikedVideos: VideoModel[] = [];
  allVideos: VideoModel[] = [];
  videoCategoryList: CategoryModel[];
  selectedCatTab: string = 'all';
  constructor(private _videoService: VideoService, private _categoryService: CategoryService, private _router: Router, ) {
    this.feedVideos();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  private showSlide(targetSlideIndex: number) {
    this.selectedSlide = this.bannerVideos[targetSlideIndex].videoId;
    this.scrollBannerBtnBar(targetSlideIndex)
  }

  private bannerSwipeLeft(slideindex: number): void {
    let targetSlideIndex: number = 0;
    if (slideindex >= (this.bannerVideos.length - 1)) {
      targetSlideIndex = 0;
    }
    else {
      targetSlideIndex = slideindex + 1;
    }
    this.showSlide(targetSlideIndex);
  }

  private bannerSwipeRight(slideindex: number): void {
    let targetSlideIndex: number = 0;
    if (slideindex <= 0) {
      targetSlideIndex = this.bannerVideos.length - 1;
    }
    else {
      targetSlideIndex = slideindex - 1;
    }
    this.showSlide(targetSlideIndex);
  }

  public bannerNextPrev(ev, nextOrPrev: string) {
    let vdoLength = this.bannerVideos.length
    for (let i = 0; i < vdoLength; i++) {
      if (this.bannerVideos[i].videoId == this.selectedSlide) {
        if (nextOrPrev == 'next') {
          this.bannerSwipeLeft(i);
        }
        else {
          this.bannerSwipeRight(i);
        }
        break;
      }
    }
  }

  public playVideo(ev: MouseEvent, videoId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this._router.navigate(['video/play', videoId]);
  }

  private async scrollBannerBtnBar(targetSlideIndex: number) {
    let bannerBtnWrapDiv: HTMLDivElement = this.bannerBtnWrap.nativeElement;
    let bannerBtnDiv = <HTMLDivElement>bannerBtnWrapDiv.firstElementChild;
    let sliderBtnWidth: number = bannerBtnDiv && bannerBtnDiv.offsetWidth || 300;
    let scrollLength: number = sliderBtnWidth * targetSlideIndex;
    bannerBtnWrapDiv.scroll({ left: scrollLength, behavior: 'smooth' });
  }

  private feedVideos() {

    this._videoService.getMostLikedVideosByCategoryId([], 0, 10).then(mlv => {
      this.mostLikedVideos = mlv.map(item => Object.assign({}, item));

      this.bannerVideos = mlv.map(item => Object.assign({}, item));
      this.selectedSlide = this.bannerVideos[0].videoId;
    });

    
    this._categoryService.getAllCategories().then(catList => {
      this.videoCategoryList = catList;
      this._videoService.getVideoByCategoryId(Array.from(catList.slice(0, 5), cat => cat.categoryId ), 0, 10).then(vidList => {
        this.allVideos = vidList;
      });
    });



    // this._videoService.getMostLikedVideos().then(vidList => this.mostLikedVideos = vidList);

    // this._videoService.getAllVideos().then(vidList => this.allVideos = vidList);

    // this._videoService.getAllCategories().then(catList => this.videoCategoryList = catList);
  }

  public imgSlide(slideTo: string) {
    let slider: HTMLDivElement = this.imgSlider.nativeElement;
    let scrollLength: number = 0;
    if (slideTo == 'left') {
      scrollLength = slider.scrollLeft + slider.clientWidth;
      if (scrollLength >= slider.scrollWidth) {
        scrollLength = 0;
      }
    }
    else {
      scrollLength = slider.scrollLeft - slider.clientWidth;
      if (slider.scrollLeft <= 0) {
        scrollLength = slider.scrollWidth;
      }
    }
    slider.scroll({ left: scrollLength, behavior: 'smooth' });
  }

  public showCat(ev: MouseEvent, catId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this.selectedCatTab = catId;
    console.log(catId);
    if (catId == 'all') {
      this.allVideos.forEach(async (lv) => { lv.hidden = false });
    }
    else {
      this.allVideos.forEach(async (lv) => lv.hidden = lv.categoryId.find(lvc => lvc.categoryId == catId) ? false : true);
    }
  }

}
