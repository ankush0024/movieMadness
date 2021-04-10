import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public releaseDate;
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
  constructor(private route: ActivatedRoute, private movie: MovieService, private spinner: NgxSpinnerService) { }
  public youtubeVideoList: any = [];
  public videoLink;
  public videoId;
  public temp;
  public movieName;
  public MovieOrTv;
  ngOnInit(): void {
    this.spinner.show();
    this.MovieOrTv = localStorage.getItem("MovieOrTv");
    this.favouriteMovies = JSON.parse(localStorage.getItem('movie_favorites'));
    this.movieData = null;
    this.movieCreditData = null;
    this.route.params.subscribe((res) => {
      this.movieId = res.id;
      this.movieInfo.id = this.movieId;
      if (this.MovieOrTv == 'movie') {
        this.getMovies(this.movieInfo.id);
      }
      else {
        this.getTv(this.movieInfo.id);
      }

    });
  }
  public getMovies(movieId) {
    this.movie.getMovieById(movieId).subscribe((res) => {
      this.movieData = res;
      this.movieName = res['original_title'];
      this.releaseDate=res['release_date'].split('-')[0];
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
      this.getVideo("movie");


    });
  }
  public getTv(tvId) {
    this.movie.getTvById(tvId).subscribe((res) => {
      this.movieData = res;
      this.movieName = res['name'];
      this.releaseDate=res['first_air_date'].split('-')[0];
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
      this.getVideo("tv");
    });
  }
  public getVideo(movieOrTv, tokenNo = 1) {
    let apiToken;
    if (tokenNo <= environment.youtubeApiKeyArray.length) {
      apiToken = environment.youtubeApiKeyArray.filter((res) => res.id == tokenNo)[0]['token'];
      this.movie.getVideos(this.movieName, movieOrTv, apiToken).subscribe((res) => {
        this.spinner.hide();
        this.youtubeVideoList = res.items;
        this.videoId = this.youtubeVideoList[0].id.videoId;
        this.videoLink = `${this.youtubeURLPrefix}${this.videoId}${this.youtubeURLSuffix}`;
      }, (err) => {
        if (err.error.error.code == 403) {
          tokenNo = tokenNo + 1;
          this.getVideo(movieOrTv, tokenNo)
        }
        else {
          this.spinner.hide();
          alert("there was an error in fetching the data from youtube check your network connection");
          console.error(err);
        }
        //this.spinner.hide();

      }
      );

    }
    else {
      this.spinner.hide();
      alert("All the youtube api keys limit has expired please try again tomorrow");
    }
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
