import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../../services/image/image.service';
import { ImageModel } from '../../../../models/image.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css'],
  providers: [ImageService]
})
export class AllImagesComponent implements OnInit {

  constructor(private _imageService : ImageService, private _router: Router) {
    this.getAllImages();
   }

  pageTitle: string = 'Images';

  allImages: ImageModel[] = []; 

  ngOnInit() {
    
  }

  private getAllImages(){
    this._imageService.GetAllImages().then(imgs => this.allImages = imgs);
  }

  /**
   * viewPost
   */
  public viewPost(ev: MouseEvent, imageId : string) {
    ev.preventDefault();
    ev.stopPropagation();
    this._router.navigate(['image/view', imageId]);
  }

}
