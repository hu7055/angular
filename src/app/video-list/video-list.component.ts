import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { VideoItem } from '../videos/video';
import { VideosService } from '../videos/videos.service';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [VideosService]
})
export class VideoListComponent implements OnInit, OnDestroy {
  title : String = "Video List";
  todayDate;
  private req: any;
  @Input() videoList: [VideoItem];
  @Input() callBySearch: boolean;

  constructor( private video : VideosService) { }

  ngOnInit() {
    this.todayDate = new Date();
    if(!this.callBySearch){
    this.req = this.video.list().subscribe(data =>{
      console.log(data);
      this.videoList = data as [VideoItem];
    });
    }
  }

  ngOnDestroy(){
    if(!this.callBySearch){
      this.req.unsubscribe();
    }
  }
  




}
