import { CategoryModel } from "./category.model";
import { IthumbnailSize } from "../interfaces/thumbnail.interface";

export class VideoModel {
    public videoId: number = 0;

    /** Array of video category ids */
    public categoryId: CategoryModel[] = [];
    public videoUrl: string = '';
    public title: string = '';
    public videoTags: string[] = [];

    /** Video upload date */
    public videoDate: string;
    public language: string = '';
    public description: string = '';
    public coverImage: IthumbnailSize = {
        original: '',
        large: '',
        medium: '',
        small: '',
    };

    // length of video in seconds
    public videoLength: number = 0;
    public extension: string = '';
    public videoMime: string = '';
    public minAgeReq: number = null;

    /** Video type like exclusive, orignal, fetured */
    public type: string = '';
    /** Free or paid */
    public currentAvailability: string = '';
    public adult: boolean = false;
    public downloadRights: boolean = false;
    public internationalRights: boolean = false;
    public genere: string = '';
    public director: string = '';
    public producer: string = '';
    public writer: string = '';
    public musicDirector: string = '';
    public productionHouse: string = '';
    public actor: string = '';
    public singer: string = '';
    public country: string = '';

    public likesCount: number = 0;
    public dislikesCount: number = 0;
    public viewsCount: number = 0;
    
    public hidden: boolean = false;
}
