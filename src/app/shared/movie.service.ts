import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public requestOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };
  public baseApiUrl = environment.baseApiUrl;
  public trendingMovieUrl = this.baseApiUrl + environment.trendingMovieList;
  public trendingTvUrl = this.baseApiUrl + environment.trendingTvShowList;
  public searchMovie = this.baseApiUrl + environment.searchMovie;
  public searchTv = this.baseApiUrl + environment.searchTv;
  public movieByIdUrl = this.baseApiUrl + environment.movieByIdUrl;
  public tvByIdUrl = this.baseApiUrl + environment.tvByIdUrl;
  /* AIzaSyBWX2H9CKxChFgsx51qWFiY0DvmeZF_Sgs */
  private API_URL = environment.Youtube_Api_Url;
  private API_TOKEN = 'AIzaSyASPO73rBcODRYS6W2nln1CJo-2ctsS5Uc';
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
    return this.http.get(url, this.requestOptions)
  }
  public SearchMovie(query) {
    return this.http.get(`${this.searchMovie}?query=${query}`, this.requestOptions);
  }
  public SearchTv(query) {
    return this.http.get(`${this.searchTv}?query=${query}`, this.requestOptions);
  }
  public getMovieById(id): Observable<any> {
    return this.http.get(this.movieByIdUrl + id, this.requestOptions);
  }
  public getTvById(id): Observable<any> {
    return this.http.get(this.tvByIdUrl + id, this.requestOptions);
  }

  public getVideos(movieName: string, movierOrTv): Observable<any> {
    let url;
    if (movierOrTv === 'movie') {
      url = `${this.API_URL}?q=${movieName}%20official%20trailer&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=2`;
    }
    else {
      url = `${this.API_URL}?q=${movieName}%20Tv%20Show%20official%20trailer&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=2`;
    }

    return this.http.get(url).pipe(
      map((response: any) => response.items)
    );
  }
}
