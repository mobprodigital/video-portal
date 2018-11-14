import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { CategoryModel } from '../../models/category.model';
import { VideoModel } from '../../models/video.model';
import { CategoryService } from '../../services/categories/category.service';
import { NavItemModel } from '../../models/nav-item.model';



export type VideoByCategory = {
  name: string;
  id: string;
  videos: VideoModel[]
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [VideoService, CategoryService]
})
export class HeaderComponent implements OnInit {


  videoCategories: CategoryModel[] = [];
  videoList: VideoModel[] = [];
  videoListByCategory: VideoByCategory[] = [];
  mainMenu: NavItemModel[] = [];
  viewMenu: boolean = false;
  viewVideoMenu: boolean = false;
  searchTerm: string = '';
  mobSaerchVisible: boolean = false;
  constructor(private router: Router, private _videoService: VideoService, private _categoryService: CategoryService) {
    router.events.subscribe(async e => {

      if (e instanceof NavigationStart) {

      }

      if (e instanceof NavigationEnd) {
        this.viewMenu = false;
        this.viewVideoMenu = false;
      }
    });
    this.createNavMenu();
  }

  ngOnInit() {
    this.viewMenu = window.outerWidth > 992;
  }

  private createNavMenu() {

    this._categoryService.getRootCategories().then(async catArr => {
      if (catArr.length > 0) {
        try {
          let rootCatArr = await Promise.all(catArr.map(async (cat) => {
            let _subNavMenu = new NavItemModel(cat.categoryId.toString(), cat.categoryName, cat.categoryName.toLowerCase());

            //set as mega menu for video category
            // _subNavMenu.megaMenu = cat.categoryId.toString() == '2';

            let subCat = await this._categoryService.getAllCategories();


            if (subCat.length > 0) {
              _subNavMenu.navItems = await Promise.all(subCat.map(async (subCatItem) => {
                try {
                  let subCatVideo: VideoModel[] = await this._videoService.getVideoByCategoryId([subCatItem.categoryId], 0, 4);

                  if (_subNavMenu.megaMenu) {
                    let megaMenuItem: NavItemModel = new NavItemModel(
                      subCatItem.categoryId.toString(),
                      subCatItem.categoryName,
                      cat.categoryName.toLowerCase() + '/category/' + btoa(subCatItem.categoryId.toString())
                    );
                    megaMenuItem.megaMenuData = subCatVideo;
                    return megaMenuItem;
                  }
                  else {
                    let megaMenuItem: NavItemModel = new NavItemModel(
                      subCatItem.categoryId.toString(),
                      subCatItem.categoryName,
                      cat.categoryName.toLowerCase() + '/category/' + btoa(subCatItem.categoryId.toString())
                    );

                    megaMenuItem.megaMenuData = subCatVideo;
                    return megaMenuItem;
                  }

                }
                catch (err) {
                  alert('err in code ' + err);
                }
              }));

            }
            else {
              alert('no sub cats found');
            }

            return _subNavMenu;
          }));
          this.mainMenu.push(...rootCatArr);
        }
        catch (err) {
          alert('Err in code : ' + err);
        }
      };

      this.mainMenu.push(new NavItemModel('nav3', 'About Us', '/about-us'));
      this.mainMenu.push(new NavItemModel('nav4', 'Contact Us', '/contact-us'));
    }).catch(err => alert(err));
  }




  /**
   * Navigate to play video page and play a video 
   * @param videoId video id
   */
  public viewVideo(ev: MouseEvent, videoId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this.router.navigate(['video/play', videoId]);
  }
  public toggleMobMenu(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.viewVideoMenu = !this.viewVideoMenu
  }

  public toggleViewMenu(ev: MouseEvent, menuVisibility: boolean) {
    ev.preventDefault();
    ev.stopPropagation();
    this.viewMenu = menuVisibility;
    if (!this.viewMenu) {
      this.viewVideoMenu = false;
    }
  }
  public searchSubmit() {
    if (this.searchTerm && this.searchTerm.trim().length > 0) {
      this.router.navigate(['video/search', this.searchTerm]);
    }
  }
  public toggleMobileSearch(toShow: boolean) {
    this.mobSaerchVisible = toShow;
  }
}
