import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/shared/movie.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-movielist',
  templateUrl: './movieList.component.html',
  styleUrls: ['./movieList.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(private route: Router, private movieService: MovieService) { }
  public baseImgUrl = environment.baseImgUrl;
  public testData: any = {};
  public moviesArray: any = [];
  public movieSearch: string;
  public isitFavouriteTab;
  public MovieOrTv:string="movie";
  public favouriteMovieArray:any;
  ngOnInit(): void {
    if(localStorage.getItem('FavouriteMovie')){
    this.favouriteMovieArray=JSON.parse(localStorage.getItem('FavouriteMovie'));
  }
    else{ this.favouriteMovieArray=[];

    }
    this.isitFavouriteTab = sessionStorage.getItem('favouriteTab');
    console.log(this.isitFavouriteTab);
    if (this.isitFavouriteTab == true) {
     // this.moviesArray = JSON.parse(localStorage.getItem('movie_favorites'));
    }
    else {
      this.getData();
    }
    this.movieSearch = null;
  }
  public NavigateToTest() {
    this.route.navigateByUrl('/test');
  }
  public getTrending(page){
    if(this.MovieOrTv==='movie'){
      return this.movieService
      .getTrendingMovieData(page);
    }
    else{
      return this.movieService
      .getTrendingTvData(page);
    }
    
  }
  public getData() {
    this.getTrending(1)
      .subscribe(res => {
        console.log("didnt came here");
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

    this.getTrending(
        pageNo,
      )
      .subscribe(res => {
        //  console.log(res);
        this.testData = res;
        this.moviesArray.push(...res.results);
        console.log(this.moviesArray);
      });
  }
  public SearcMovieOrShow(query){
    if(this.MovieOrTv==='movie'){
      return this.movieService.SearchMovie(query);
    }
    else{
      return this.movieService.SearchTv(query);
    }
  }
  public movieSearchfun(): void {
    if (this.movieSearch === '') {
      this.getData();
      return;
    }
    this.SearcMovieOrShow(
        this.movieSearch
      )
      .subscribe(res => {
        console.log(res);
        this.moviesArray = [];
        this.moviesArray.push(...res['results']);
      });
  }
  public addToFav(val){
    console.log(val);
let temparr=[...this.favouriteMovieArray];
if(temparr.filter((ele)=>ele.title===val.title).length==0){
this.favouriteMovieArray.push(val);
    localStorage.setItem('FavouriteMovie',JSON.stringify(this.favouriteMovieArray));
  }
}
}
