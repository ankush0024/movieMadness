import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-movielist',
  templateUrl: './movieList.component.html',
  styleUrls: ['./movieList.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(private route: Router, private http: HttpClient) { }
  public baseImgUrl = 'https://image.tmdb.org/t/p/w500/';
  public ee = '/7G2VvG1lU8q758uOqU6z2Ds0qpA.jpg';
  public f = 'https://image.tmdb.org/t/p/w500//7G2VvG1lU8q758uOqU6z2Ds0qpA.jpg';
  public testData: any = {};
  public moviesArray: any = [];
  public tesr: any = ['1', '2', '3'];
  public movieSearch: string;
  public isitFavouriteTab;
  ngOnInit(): void {
    this.isitFavouriteTab = sessionStorage.getItem('favouriteTab');
    console.log(this.isitFavouriteTab);
    if (this.isitFavouriteTab == true) {
      this.moviesArray = JSON.parse(localStorage.getItem('movie_favorites'));
    }
    else {
      this.getData();
    }
    this.movieSearch = null;
  }
  public NavigateToTest() {
    this.route.navigateByUrl('/test');
  }
  public getData() {
    const headrs = new Headers({
      'content-type': 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzA2MDViZjIwZDYzZTRiZTY2ZWJiYzU0MjJiNTk1YiIsInN1YiI6IjVmNjg2ODQ1NWYyZGIxMDAzNTQwYjhlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZpTOOqQ6zydIY5fNxU_CCr62Yezgc28-gZxlhlpmlY'
    });
    const requestOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzA2MDViZjIwZDYzZTRiZTY2ZWJiYzU0MjJiNTk1YiIsInN1YiI6IjVmNjg2ODQ1NWYyZGIxMDAzNTQwYjhlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZpTOOqQ6zydIY5fNxU_CCr62Yezgc28-gZxlhlpmlY'
      })
    };

    this.http
      .get(
        'https://api.themoviedb.org/3/trending/movie/day?page=1&api_key=c30605bf20d63e4be66ebbc5422b595b',
        requestOptions
      )
      .subscribe(res => {
        console.log(res);
        this.testData = res;
        this.moviesArray = this.testData.results;
         console.log(this.moviesArray);
      });
  }
  public loadMore() {
    if (this.movieSearch !== '' && this.movieSearch !== null) {
      return;
    }

    const pageNo = this.testData.page + 1;
    const headrs = new HttpHeaders({
      'content-type': 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzA2MDViZjIwZDYzZTRiZTY2ZWJiYzU0MjJiNTk1YiIsInN1YiI6IjVmNjg2ODQ1NWYyZGIxMDAzNTQwYjhlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZpTOOqQ6zydIY5fNxU_CCr62Yezgc28-gZxlhlpmlY'
    });
    const requestOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzA2MDViZjIwZDYzZTRiZTY2ZWJiYzU0MjJiNTk1YiIsInN1YiI6IjVmNjg2ODQ1NWYyZGIxMDAzNTQwYjhlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZpTOOqQ6zydIY5fNxU_CCr62Yezgc28-gZxlhlpmlY'
      })
    };
    this.http
      .get<any>(
        'https://api.themoviedb.org/3/trending/movie/day?page=' + pageNo + '&api_key=c30605bf20d63e4be66ebbc5422b595b',
        requestOptions
      )
      .subscribe(res => {
        //  console.log(res);
        this.testData = res;
        this.moviesArray.push(...res.results);
          console.log(this.moviesArray);
      });
  }
  public movieSearchfun(): void {
    if (this.movieSearch === '') {
      this.getData();
      return;
    }

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
        this.moviesArray = [];
        this.moviesArray.push(...res.results);
      });
  }
}
