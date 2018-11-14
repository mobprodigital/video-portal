import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax/ajax.service';
import { ImageModel } from '../../models/image.model';
import { ImageCategoryModel } from '../../models/image-category.model';

@Injectable()
export class ImageService {

    private imageList: ImageModel[] = [];


    constructor(private _ajaxService: AjaxService) {
        this.feedTempImages();
    }

    public getImageById(id: string) {
        return Promise.resolve(this.imageList.find(img => img.id == id));
    }

    /**
     * Get all images of all categories
     */
    public GetAllImages(): Promise<ImageModel[]> {
        return Promise.resolve(this.imageList);
    }

    private feedTempImages() {
        //#region 3d
        let img1: ImageModel = new ImageModel();
        img1.id = 'img1';
        img1.title = 'Abstract';
        img1.categories = [
            new ImageCategoryModel('3d', 'imgcat1')
        ];
        img1.images = {
            Hd: '/assets/imagedata/3d/one/large.jpg',
            Standard: '/assets/imagedata/3d/one/small.jpg'
        };

        img1.likesCount = 125;
        img1.dislikesCount = 15;
        img1.viewsCount = 455;


        let img2: ImageModel = new ImageModel();
        img2.id = 'img2';
        img2.title = 'Turtle';
        img2.categories = [
            new ImageCategoryModel('3d', 'imgcat1')
        ];
        img2.images = {
            Hd: '/assets/imagedata/3d/two/large.jpg',
            Standard: '/assets/imagedata/3d/two/small.jpg'
        };

        img2.likesCount = 325;
        img2.dislikesCount = 35;
        img2.viewsCount = 445;

        let img3: ImageModel = new ImageModel();
        img3.id = 'img3';
        img3.title = 'Football 3d';
        img3.categories = [
            new ImageCategoryModel('3d', 'imgcat1')
        ];
        img3.images = {
            Hd: '/assets/imagedata/3d/three/large.jpg',
            Standard: '/assets/imagedata/3d/three/small.jpg'
        };

        img3.likesCount = 655;
        img3.dislikesCount = 46;
        img3.viewsCount = 955;

        //#endregion

        //#region celebrities

        let img4: ImageModel = new ImageModel();
        img4.id = 'img4';
        img4.title = 'Anushka sharma';
        img4.categories = [
            new ImageCategoryModel('Celebrity', 'imgcat2')
        ];
        img4.images = {
            Hd: '/assets/imagedata/celebrities/anushka-sharma/large.jpg',
            Standard: '/assets/imagedata/celebrities/anushka-sharma/small.jpg',
        };

        img4.likesCount = 925;
        img4.dislikesCount = 45;
        img4.viewsCount = 1055;

        let img5: ImageModel = new ImageModel();
        img5.id = 'img5';
        img5.title = 'Deepika Padukone';
        img5.categories = [
            new ImageCategoryModel('Celebrity', 'imgcat2')
        ];
        img5.images = {
            Hd: '/assets/imagedata/celebrities/deepika-padukone/large.jpg',
            Standard: '/assets/imagedata/celebrities/deepika-padukone/small.jpg',
        };

        img5.likesCount = 625;
        img5.dislikesCount = 65;
        img5.viewsCount = 655;


        let img6: ImageModel = new ImageModel();
        img6.id = 'img6';
        img6.title = 'Miley Cyrus';
        img6.categories = [
            new ImageCategoryModel('Celebrity', 'imgcat2')
        ];
        img6.images = {
            Hd: '/assets/imagedata/celebrities/miley-cyrus/large.jpg',
            Standard: '/assets/imagedata/celebrities/miley-cyrus/small.jpg',
        };

        img6.likesCount = 1525;
        img6.dislikesCount = 45;
        img6.viewsCount = 5455;


        //#endregion

        //#region nature

        let img7: ImageModel = new ImageModel();
        img7.id = 'img7';
        img7.title = 'Butterfly';
        img7.categories = [
            new ImageCategoryModel('Nature', 'imgcat3')
        ];
        img7.images = {
            Hd: '/assets/imagedata/nature/butterfly/large.jpg',
            Standard: '/assets/imagedata/nature/butterfly/small.jpg',
        };


        img7.likesCount = 565;
        img7.dislikesCount = 125;
        img7.viewsCount = 1468;

        let img8: ImageModel = new ImageModel();
        img8.id = 'img8';
        img8.title = 'Sea shells';
        img8.categories = [
            new ImageCategoryModel('Nature', 'imgcat3')
        ];
        img8.images = {
            Hd: '/assets/imagedata/nature/seashells/large.jpg',
            Standard: '/assets/imagedata/nature/seashells/small.jpg',
        };

        img8.likesCount = 119;
        img8.dislikesCount = 19;
        img8.viewsCount = 419;


        let img9: ImageModel = new ImageModel();
        img9.id = 'img9';
        img9.title = 'Turtle';
        img9.categories = [
            new ImageCategoryModel('Nature', 'imgcat3')
        ];
        img9.images = {
            Hd: '/assets/imagedata/nature/turtle/large.jpg',
            Standard: '/assets/imagedata/nature/turtle/small.jpg',
        };
        img9.likesCount = 469;
        img9.dislikesCount = 75;
        img9.viewsCount = 1459;


        //#endregion

        this.imageList = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

    }
}