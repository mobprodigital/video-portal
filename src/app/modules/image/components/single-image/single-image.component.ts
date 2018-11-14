import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image/image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.css'],
  providers: [ImageService]
})
export class SingleImageComponent implements OnInit {

  currentImage: ImageModel;

  constructor(private _imageService: ImageService, private _activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    let imageId = this._activatedRoute.snapshot.paramMap.get('id');
    if (imageId) {
      this._imageService.getImageById(imageId).then(img => this.currentImage = img);
    }
  }

}
