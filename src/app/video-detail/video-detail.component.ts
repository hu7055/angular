import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import { VideoItem } from '../videos/video';
import { VideosService} from '../videos/videos.service'


@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers:[VideosService]
})
export class VideoDetailComponent implements OnInit, OnDestroy {

  private routeSub:any;
  private req: any;
  @Input() video: VideoItem;

  slug:any;

  constructor(private route: ActivatedRoute, private _video : VideosService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {

      this.slug = params['slug'];
      console.log("video-detail components::slug ===>" + this.slug);
      this.req = this._video.get(this.slug).subscribe(data => {
            if(data != null){
              console.log("test===>" + data.name);
              this.video = data;
              console.log(this.video.slug);
            }
      });

    })
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.req.unsubscribe();
  } 

  getEmbedUrl(item){
    console.log("embed : " + item);
    return 'https://www.youtube.com/embed/' + item.embed + '?ecver=1';
  }


}
