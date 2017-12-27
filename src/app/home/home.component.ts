import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { VideoItem } from '../videos/video';
import { VideosService } from '../videos/videos.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideosService]
})
export class HomeComponent implements OnInit, OnDestroy {
  private req : any;
  homeImageList : [VideoItem];
  videoListDefaultImage = "assets/images/nature/7.jpg";
  constructor(private router:Router, private http : Http, private _video: VideosService) { }

  ngOnInit() {
    this.req = this._video.list().subscribe(data =>{
    
    this.homeImageList = [] as [VideoItem];
    data.filter(item=>{
      
      if(item.featured){
        this.homeImageList.push(item);
      }
    })
   });


  }
  ngOnDestroy(){
    this.req.unsubscribe();
  }

  preventNormal(event:MouseEvent, image:any){
    if(!image.prevented){
      console.log("slug : "+image.slug);
      event.preventDefault();
      this.router.navigate(['./videos/'+image.slug]);
    }
  }
}
