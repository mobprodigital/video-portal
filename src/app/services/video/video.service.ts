import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax/ajax.service';
import { VideoModel } from '../../models/video.model';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../categories/category.service';
import { ContentTypeEnum } from 'src/app/enums/content-type.enum';


@Injectable()
export class VideoService {

  constructor(private _ajaxService: AjaxService, private _categoryService: CategoryService) {
    this._categoryService.getAllCategories().then(catList => this.allCategories = catList);
  }

  private allCategories: CategoryModel[] = [];


  /**
   * Get single video by its id
   * @param videoId Video Id
   */q
  public getVideoById(videoId: string): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getContentById.php',
        dataToSend: {
          contentType: ContentTypeEnum.Video,
          contentId: videoId
        }
      }).then(resp => {
        if (resp.status === true) {
          this.parseVideoModel(resp.data).then(vid => {
            resolve(vid[0]);
          }).catch(err => {
            reject(err);
          });
        }
      }).catch(err => reject(err));
    });
  }

  /**
   * Get all videos of specified category ids
   * @param catIdArray array of category ids
   * @param fromIndex (Optional) (Default = 0) Zero based index number from witch video start 
   * @param count (Optional) (Default = 10) number of videos wants to get 
   */
  public getVideoByCategoryId(catIdArray: string[], fromIndex: number = 0, count: number = 10): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getContentByCategoryId.php',
        dataToSend: {
          contentType: ContentTypeEnum.Video,
          categoryId: catIdArray,
          start: fromIndex,
          count: count
        }
      }).then(ajaxResponse => {
        if (ajaxResponse.status === true) {
          this.parseVideoModel(ajaxResponse.data).then(vid => {
            resolve(vid);
          }).catch(err => {
            reject(err);
          });
        }
      }).catch(err => {
        reject(err);
      })
    });
  }

  /**
   * Get most liked videos of optional specified category ids
   * @param catIdArray (optional) (default = []) array of category ids
   * @param fromIndex (Optional) (Default = 0) Zero based index number from witch video start 
   * @param count (Optional) (Default = 10) number of videos wants to get 
   */
  public getMostLikedVideosByCategoryId(catIdArray: number[] = [], fromIndex: number = 0, count: number = 10): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getMostLikedContentByCategoryId.php',
        dataToSend: {
          contentType: ContentTypeEnum.Video,
          categoryId: catIdArray,
          start: fromIndex,
          count: count
        }
      }).then(ajaxResponse => {
        if (ajaxResponse.status === true) {
          this.parseVideoModel(ajaxResponse.data).then(vid => {
            resolve(vid);
          }).catch(err => {
            reject(err);
          });
        }
      }).catch(err => reject(err));
    });
  }
  /**
   * Get most viewed videos of optional specified category ids
   * @param catIdArray (optional) (default = []) array of category ids
   * @param fromIndex (Optional) (Default = 0) Zero based index number from witch video start 
   * @param count (Optional) (Default = 10) number of videos wants to get 
   */
  public getMostViewedVideosByCategoryId(catIdArray: number[] = [], fromIndex: number = 0, count: number = 10): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getMostViewedContentByCategoryId.php',
        dataToSend: {
          contentType: ContentTypeEnum.Video,
          categoryId: catIdArray,
          start: fromIndex,
          count: count
        }
      }).then(ajaxResponse => {
        if (ajaxResponse.status === true) {
          this.parseVideoModel(ajaxResponse.data).then(vid => {
            resolve(vid);
          }).catch(err => {
            reject(err);
          });
        }
      }).catch(err => reject(err));
    });
  }

  /**
   * getAllVideos
   */
  public getAllVideos(fromIndex: number = 0, count: number = 10): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getAllContent.php',
        dataToSend: {
          contentType: ContentTypeEnum.Video,
          start: fromIndex,
          count: count
        }
      }).then(ajaxResponse => {
        if (ajaxResponse.status === true) {
          this.parseVideoModel(ajaxResponse.data).then(vid => {
            resolve(vid);
          }).catch(err => {
            reject(err);
          });
        }
      }).catch(err => reject(err));
    });
  }

  /**
   * Incrase view count by one
   * @param videoId video id
   */
  public setViewCount(videoId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'setViewCount.php',
        dataToSend: {
          contentTypeId: ContentTypeEnum.Video,
          contentId: videoId,
        }
      }).then(res => {
        if (res.status === true) {
          resolve(res.msg);
        }
        else {
          reject(res.msg);
        }
      }).catch(err => reject(err));
    });
  }

  /**
   * Increase view time by seconds
   * @param videId Video Id
   * @param time Time in seconds
   */
  public setVideoTime(videoId: number, time: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'setViewTimeByContentId.php',
        dataToSend: {
          contentType: ContentTypeEnum.Video,
          contentId: videoId,
          time: time
        }
      }).then(res => {
        if (res.status === true) {
          resolve(res.msg);
        }
        else {
          reject(res.msg);
        }
      }).catch(err => reject(err));
    });

  }

  /**
   * Parse video data array into VideoModel class array
   * @param videoDataArr Raw array of video data from web service
   */
  private parseVideoModel(videoDataArr: any[]): Promise<VideoModel[]> {

    return new Promise(async (resolve, reject) => {
      if (videoDataArr && videoDataArr.length > 0) {
        let videoArr: VideoModel[] = [];
        try {
          videoArr = await Promise.all(videoDataArr.map(async (vd) => {
            let vid = new VideoModel();
            vid.videoId = vd.videoId;
            vid.categoryId = vd.categoryId && vd.categoryId.length > 0  ? vd.categoryId.map(c => new CategoryModel(c.categoryName, c.categoryId)) : [];
            vid.videoUrl = vd.videoUrl;
            vid.title = vd.title;
            vid.videoTags = vd.videoTags;
            vid.videoDate = vd.videoDate;
            vid.language = vd.language;
            vid.description = vd.description;

            vid.coverImage.original = vd.coverImage.original;
            vid.coverImage.large = vd.coverImage.large;
            vid.coverImage.medium = vd.coverImage.medium;
            vid.coverImage.small = vd.coverImage.small;

            vid.videoLength = !!vd.videoLength ? parseFloat(vd.videoLength) : null;
            vid.extension = vd.extension;
            vid.videoMime = vd.videoMime;
            vid.minAgeReq = parseFloat(vd.minAgeReq);
            vid.type = vd.type;
            vid.likesCount = parseInt(vd.likesCount);
            vid.dislikesCount = parseInt(vd.dislikesCount);
            vid.viewsCount = parseInt(vd.viewsCount);


            return vid;

          }));
          resolve(videoArr);
        }
        catch (err) {
          reject(err)
        }
      }
      else {
        reject('No videos found');
      }
    });
  }

  /**
   * 
   * @param videoId Video id
   * @param catId Category id
   */
  public getRelatedVideos(videoId: number, catId: string): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getRelatedVideosByVideoId.php',
        dataToSend: {
          contentTypeId: ContentTypeEnum.Video,
          vid: videoId,
          cid: catId
        }
      }).then(data => {
        if (data.status === true) {
          this.parseVideoModel(data.data).then(vdos => {
            resolve(vdos);
          }).catch(err => reject(err));
        }
        else {
          reject(data.msg);
        }
      }).catch(err => reject(err));
    });
  }

  /**
   * 
   * @param searchTerm search terms query
   * @param fromIndex start index of array
   * @param count number of search results 
   */
  public search(searchTerm: string, fromIndex: number = 0, count: number = 10): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'VideoBySearch.php',
        dataToSend: {
          contentTypeId: ContentTypeEnum.Video,
          searchTerm: searchTerm,
          start: fromIndex,
          count: count
        }
      }).then(data => {
        if (data.status === true) {
          this.parseVideoModel(data.data).then(vdos => {
            resolve(vdos);
          }).catch(err => reject(err));
        }
        else {
          reject(data.msg);
        }
      }).catch(err => reject(err));
    });
  }
}
