import { Injectable } from '@angular/core';
import { ContentTypeModel } from 'src/app/models/content-type.model';
import { AjaxService } from '../ajax/ajax.service';
import { ContentTypeEnum } from 'src/app/enums/content-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  constructor(private ajaxService: AjaxService) { }

  public allowedContentType: ContentTypeModel[] = [];

  public getContentType(): Promise<ContentTypeModel[]> {
    return new Promise((resolve, reject) => {
      this.ajaxService.Post({
        apiName: 'getContentType.php'
      }).then(resp => {
        if (resp.status) {
          this.parseContentType(resp.data).then(ct => resolve(ct)).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      })
    });
  }

  private parseContentType(contentType: any[]): Promise<ContentTypeModel[]> {
    return new Promise((resolve, reject) => {
      if (contentType && contentType.length > 0) {
        try {
          let cType = contentType.map(ct => new ContentTypeModel(ct.contentTypeName, ct.contentTypeId));
          resolve(cType);
        }
        catch (err) {
          reject(err);
        }
      }
      else {
        resolve([]);
      }
    });

  }

  public isAllowedContentType(contentTypeId: ContentTypeEnum): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.allowedContentType && this.allowedContentType.length > 0) {
        let isExists = this.allowedContentType.some((Ctype) => Ctype.ContentTypeId == contentTypeId);
        resolve(isExists);
      }
      else {
        resolve(false);
      }
    })

  }

}
