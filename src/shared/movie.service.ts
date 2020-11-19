import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public requestOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzA2MDViZjIwZDYzZTRiZTY2ZWJiYzU0MjJiNTk1YiIsInN1YiI6IjVmNjg2ODQ1NWYyZGIxMDAzNTQwYjhlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZpTOOqQ6zydIY5fNxU_CCr62Yezgc28-gZxlhlpmlY'
    })
  };
  constructor(private http: HttpClient) { }
  public getMovieData(url): Observable<any>{
  return  this.http.get(url, this.requestOptions);
   }
}
