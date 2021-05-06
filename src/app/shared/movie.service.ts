import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public requestOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };
  public baseApiUrl = environment.TMDBApiBaseUrl;
  public trendingMovieUrl = this.baseApiUrl + environment.trendingMovieList;
  public trendingTvShowUrl = this.baseApiUrl + environment.trendingTvShowList;
  public searchMovie = this.baseApiUrl + environment.searchMovie;
  public searchTvShow = this.baseApiUrl + environment.searchTv;
  public movieByIdUrl = this.baseApiUrl + environment.movieByIdUrl;
  public tvByIdUrl = this.baseApiUrl + environment.tvByIdUrl;
  private Youtube_searchData_url = environment.Youtube_Api_Url;
  constructor(private http: HttpClient) { }
  public getTrendingMovies(page): Observable<any> {
    return this.http.get(`${this.trendingMovieUrl}?page=${page}`, this.requestOptions);
  }
  public getTrendingTvShows(page): Observable<any> {
    return this.http.get(`${this.trendingTvShowUrl}?page=${page}`, this.requestOptions);
  }
  public SearchMoviesByName(query) {
    return this.http.get(`${this.searchMovie}?query=${query}`, this.requestOptions);
  }
  public SearchTvShowsByName(query) {
    return this.http.get(`${this.searchTvShow}?query=${query}`, this.requestOptions);
  }
  public getMovieById(id): Observable<any> {
    return this.http.get(this.movieByIdUrl + id, this.requestOptions);
  }
  public getTvShowById(id): Observable<any> {
    return this.http.get(this.tvByIdUrl + id, this.requestOptions);
  }

  public getTrailers(movieName: string, movierOrTv, ApiToken): Observable<any> {
    let url;
    if (movierOrTv === 'movie') {
      url = `${this.Youtube_searchData_url}?q=${movieName}%20official%20trailer&key=${ApiToken}&part=snippet&type=video&maxResults=2`;
    }
    else {
      url = `${this.Youtube_searchData_url}?q=${movieName}%20Tv%20Show%20official%20trailer&key=${ApiToken}&part=snippet&type=video&maxResults=2`;
    }

    return this.http.get(url);
  }
}
