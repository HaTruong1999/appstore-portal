import { Component, OnInit } from '@angular/core';
import { AppsService } from '../core/service/manager/apps.service';
import { ITEMS_PER_PAGE, ITEMS_PAGESIZE } from "../core/config/pagination.constants";


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

        if (res.code == 200) {
          this.listApps = res.data.items;
          this.total = res.data.meta.totalItems;
          console.log('this.listApps: :', this.listApps)
        }
        else {
          console.log('Không tải được dữ liệu');
        }
      }, error => {
        this.isLoadingTable = false;
        console.log('Không tải được dữ liệu');
      });
  }
}
