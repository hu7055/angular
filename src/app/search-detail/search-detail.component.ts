import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../videos/videos.service';


@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css'],
  providers: [VideosService]
})
export class SearchDetailComponent implements OnInit, OnDestroy {
  query : string = null;
  private routeSub : any;
  private req: any;
  videoList: [any]

  constructor(private route: ActivatedRoute, private _video:VideosService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params=>{
     
      this.query = params['q'];
      console.log("search-detail ===>" + this.query);
      this.req = this._video.search(this.query).subscribe(data=>{
        this.videoList = data as [any];
      })
    });
  }

  ngOnDestroy(){
    this.req.unsubscribe();
    this.routeSub.unsubscribe();
  }

  getEmbedUrl(item){
    return 'https://www.youtube.com/embed/' + item.embed + '?ecver=1';
  }
}
