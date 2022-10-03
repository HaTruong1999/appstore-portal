import { Component, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

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
  }

}
