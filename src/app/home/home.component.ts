import { Component, OnInit } from '@angular/core';
import { AppsService } from '../core/service/manager/apps.service';
import { ITEMS_PER_PAGE, ITEMS_PAGESIZE } from "../core/config/pagination.constants";
import { environment } from 'src/environments/environment';
const apiUrl = environment.backEndApiURL;

declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public appsService: AppsService,
  ) { }

  currentPage: number = 1;
  pageSizes: number[] = ITEMS_PAGESIZE;
  currentPageSize = ITEMS_PER_PAGE;
  total = 0;
  listApps: any[] = [];
  isLoadingTable = true;

  searchValue: string = '';
  sort = '';

  ngOnInit(): void {
    if($('.menu-trigger').length){
      $(".menu-trigger").on('click', function() { 
        $(".menu-trigger").toggleClass('active');
        $('.header-area .nav').slideToggle(200);
      });

      $(".nav .scroll-to-section").on('click', function() { 
        $('.header-area .nav').hide(200);
      });
    }

    this.onSearch();
  }

  onSearch() {
    //this.searchValue = this.search;
    this.getData();
  }

  getData() {
    this.isLoadingTable = true;
    this.appsService.Apps(this.currentPage, this.currentPageSize, this.searchValue)
      .subscribe((res: any) => {
        this.isLoadingTable = false;

        this.listApps = res.items;
        this.listApps.forEach(item => {
          if(item.appAvatar)
            item.appAvatar = apiUrl + item.appAvatar;
          else
            item.appAvatar = 'assets/images/avatar-app-default.png';
          
          if(item.appFileAndroid)
            item.appFileAndroid = apiUrl + item.appFileAndroid;
          
          if(item.appFileIOS)
            item.appFileIOS = apiUrl + item.appFileIOS;
        });
        this.total = res.meta.totalItems;
        // console.log('list: ', this.listApps);
      }, error => {
        this.isLoadingTable = false;
        console.log('Không tải được dữ liệu');
      });
  }
}
