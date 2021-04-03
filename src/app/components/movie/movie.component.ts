import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public MovieTitle: any = null;
  public baseImg: any = 'https://image.tmdb.org/t/p/original/';
  public movieId: any = null;
  public movieData: any = null;
  public movieCreditData: any = null;
  public movieActors: any = [];
  public moviePoster: any = null;
  public movieDirectors: any = [];
  public movieProducer: any = [];
  public movieCast: any = [];
  public movieGenre: any = [];
  public movieDescription: any = null;
  public movieRating: any = null;
  public favourite = false;
  public favouriteMovies = [];
  public youtubeURLPrefix = "//www.youtube.com/embed/";
  public youtubeURLSuffix = "?rel=0&html5=1&vq=hd720&modestbranding=1&autoplay=1";
  public movieInfo = { id: '', poster_path: '', title: '' };
  constructor(private route: ActivatedRoute, private movie: MovieService,private spinner: NgxSpinnerService) { }
  public youtubeVideoList: any = [];
  public videoLink;
  public videoId;
  public temp;
  public movieName;
  public MovieOrTv;
  ngOnInit(): void {
    this.spinner.show();
    this.MovieOrTv=localStorage.getItem("MovieOrTv");
    this.favouriteMovies = JSON.parse(localStorage.getItem('movie_favorites'));
    this.movieData = null;
    this.movieCreditData = null;
    this.route.params.subscribe((res) => {
      this.movieId = res.id;
      this.movieInfo.id = this.movieId;
      if(this.MovieOrTv=='movie'){
        this.getMovies(this.movieInfo.id);
      }
      else{
    this.getTv(this.movieInfo.id);
      }
   
    });
  }
  public getMovies(movieId){
    this.movie.getMovieById(movieId).subscribe((res) => {
      this.movieData = res;
      this.movieName=res['original_title'];
      this.movieDescription = this.movieData.overview;
      this.MovieTitle = this.movieData.original_title;
      this.movieInfo.title = this.MovieTitle;
      this.movieInfo.poster_path = this.movieData.poster_path;

      this.moviePoster = this.baseImg + this.movieData.poster_path;
      this.movieRating = this.movieData.vote_average;
      this.movieGenre = [];
      for (const val of this.movieData.genres) {
        this.movieGenre.push(val.name);
      }
  this.movie.getVideos(this.movieName,"movie").subscribe((res) => {
    this.spinner.hide();

    this.youtubeVideoList = res;
    this.videoId = res[0].id.videoId;
    this.videoLink = `${this.youtubeURLPrefix}${this.videoId}${this.youtubeURLSuffix}`;

  });
     

    });
  }
  public getTv(tvId){
    this.movie.getTvById(tvId).subscribe((res) => {
      this.movieData = res;
      this.movieName=res['name'];
      this.movieDescription = this.movieData.overview;
      this.MovieTitle = this.movieData.original_title;
      this.movieInfo.title = this.MovieTitle;
      this.movieInfo.poster_path = this.movieData.poster_path;
      this.moviePoster = this.baseImg + this.movieData.poster_path;
      this.movieRating = this.movieData.vote_average;

      this.movieGenre = [];
      for (const val of this.movieData.genres) {
        this.movieGenre.push(val.name);
      }
  this.movie.getVideos(this.movieName,"tv").subscribe((res) => {
    this.spinner.hide();
    this.youtubeVideoList = res;
    this.videoId = res[0].id.videoId;
    this.videoLink = `${this.youtubeURLPrefix}${this.videoId}${this.youtubeURLSuffix}`;
  });
    });
  }
  test() {
  }
  public addFavourite() {
    this.favourite = !this.favourite;
    if (this.favourite) {
      this.favouriteMovies.push(this.movieInfo);
    }
    else {
      this.favouriteMovies = this.favouriteMovies.filter((ele) => ele.id !== this.movieInfo.id);
    }
    localStorage.setItem('movie_favorites', JSON.stringify(this.favouriteMovies));
  }
}
