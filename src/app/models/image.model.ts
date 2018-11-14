import { IthumbnailSize } from "../interfaces/thumbnail.interface";
import { ImageCategoryModel } from "./image-category.model";
import { IimageSize } from "../interfaces/image-size.interface";

export class ImageModel {
    public id: string = '';
    public title: string = '';
    public description: string = '';
    public categories: ImageCategoryModel[] = [];
    public likesCount: number = 0;
    public dislikesCount: number = 0;
    public viewsCount: number = 0;
    public createDate: Date;
    public images: IimageSize = {
        Hd: '',
        Standard: ''
    };
    public thumbnails: IthumbnailSize = {
        original: '',
        large: '',
        medium: '',
        small: '',
    };
}