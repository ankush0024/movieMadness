import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public requestOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };
  public baseApiUrl=environment.baseApiUrl;
  public trendingMovieUrl=this.baseApiUrl+environment.trendingMovieList;
  public trendingTvUrl=this.baseApiUrl+environment.trendingTvShowList;
  public searchMovie=this.baseApiUrl+environment.searchMovie;
  public searchTv=this.baseApiUrl+environment.searchTv;
  constructor(private http: HttpClient) { }
  public getMovieData(url): Observable<any> {
    return this.http.get(url, this.requestOptions);
  }
  public getTrendingMovieData(page): Observable<any> {

   
    return this.http.get(`${this.trendingMovieUrl}?page=${page}`, this.requestOptions);
  }
  public getTrendingTvData(page): Observable<any> {
    return this.http.get(`${this.trendingTvUrl}?page=${page}`, this.requestOptions);
  }
  public getLatestMovieData(url): Observable<any> {
    return this.http.get(url, this.requestOptions);
  }
  public getLatestTvData(url): Observable<any> {
    return this.http.get(url, this.requestOptions);
  }
  public SearchMovie(query){
    return this.http.get(`${this.searchMovie}?query=${query}`, this.requestOptions);
  }
  public SearchTv(query){
    return this.http.get(`${this.searchTv}?query=${query}`, this.requestOptions);
  }
}
