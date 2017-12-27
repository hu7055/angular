import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'assets/json/videos.json';

@Injectable()
export class VideosService {

  
  
  constructor(private http : Http) { }


  public list(){
      return this.http.get(endpoint)
      .map(response=>response.json())
      .catch(this.handleError);
  }

  public get(slug) : any{
    console.log("slug ===>" + slug);
    return this.http.get(endpoint)
          .map(response=>{

            let data; 
            response.json().filter(item=>{
              if(item.slug == slug){
                console.log("item ===> " + item.slug);
                data = item;
              }
            });
            
            console.log("data===>" + data);
            return data;

          })
    .catch(this.handleError);
  }

  public search(query){
    console.log("video service::query ===>" + query);
    return this.http.get(endpoint)
          .map(response=>{
            console.log( "video service::json ===>" + response.json());
            let data = []; 
            response.json().filter(item=>{
              console.log("video service::slug ===>" + item.slug);
              if(item.slug.indexOf(query) >=0){
                data.push(item);
                console.log("video service::search ===>" + data);
              }
            });
            
            return data;

          })
    .catch(this.handleError);
  }

  private handleError(error:any, caught: any): any{
    console.log(error, caught);
    console.log("error");
  }

}
