import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  constructor(private sanitizer : DomSanitizer) { }

  //videoList = ["item 1","item 2","item 3"];

videoList=[
  {
    name : "item 1",
    slug : "item -1",
    embed : "cxcxskPKtiI"
  },
  {
    name : "item 2",
    slug : "item -2",
    embed : "cxcxskPKtiI"
  },
  {
    name : "item 3",
    slug : "item -3",
    embed : "cxcxskPKtiI"
  },
  {
    name : "item 4",
    slug : "item -4",
    embed : "cxcxskPKtiI"
  }
];

  ngOnInit() {
   
  }
  
  getEmbedUrl(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.embed + '?ecver=1');
    //return 'https://www.youtube.com/embed/' + item.embed + '?ecver=1';
  }



}
