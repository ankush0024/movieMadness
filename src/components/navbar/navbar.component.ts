import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public movieSearch: string;
  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.movieSearch = null;
  }
public movieSearchfun(): void{

  const requestOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzA2MDViZjIwZDYzZTRiZTY2ZWJiYzU0MjJiNTk1YiIsInN1YiI6IjVmNjg2ODQ1NWYyZGIxMDAzNTQwYjhlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZpTOOqQ6zydIY5fNxU_CCr62Yezgc28-gZxlhlpmlY'
    })
  };
  this.http
    .get<any>(
      'https://api.themoviedb.org/3/search/movie' + '?query=' + this.movieSearch + '&api_key=c30605bf20d63e4be66ebbc5422b595b',
      requestOptions
    )
    .subscribe(res => {
      console.log(res);
    });
}
}
