import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentTypeService } from 'src/app/services/content-type/content-type.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthVideoGuard implements CanActivate {

  constructor(private contentTypeService: ContentTypeService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      if (!this.contentTypeService.isAllowedContentType) {
        resolve(true);
      } else {
        reject(false);
      }
    })
  }
}
