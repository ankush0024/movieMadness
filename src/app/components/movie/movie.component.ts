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
  public MovieTitle: any = null;
  public baseImg: any = environment.moviePosterBaseUrl;
  public movieData: any = null;
  public moviePoster: any = '';
  public movieGenre: any = [];
  public movieDescription: any = null;
  public movieRating: any = null;
  public favouriteMovies = [];
  public youtubeURLPrefix = environment.youtubeURLPrefix;
  public youtubeURLSuffix = environment.youtubeURLSuffix;
  public movieInfo = { id: '', poster_path: '', title: '',release_date:'' };
  public youtubeVideoList: any = [];
  public videoLink = '';
  public videoId;
  public movieName;
  public MovieOrTv;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show();
    this.MovieOrTv = localStorage.getItem("MovieOrTv");
    this.movieData = null;
    this.route.params.subscribe((res) => {
      this.movieInfo.id =res.id;
      if (this.MovieOrTv == 'movie') {
        this.getMovies(this.movieInfo.id);
      }
      else {
        this.getTv(this.movieInfo.id);
      }

    });
  }
  /**
   *  gets the detail of current movie 
   *
   * @param {*} movieId
   * @memberof MovieComponent
   */
  public getMovies(movieId) {
    this.movieService.getMovieById(movieId).subscribe((res) => {
      this.movieData = res;
      this.movieName = res['original_title'];
      this.movieDescription = this.movieData.overview;
      this.movieInfo.title = this.movieData.original_title;
      this.movieInfo.poster_path = this.movieData.poster_path;
      this.movieInfo.release_date=res['release_date'].split('-')[0];
      this.moviePoster = this.baseImg + this.movieData.poster_path;
      this.movieRating = this.movieData.vote_average;
      this.movieGenre = [];
      for (const val of this.movieData.genres) {
        this.movieGenre.push(val.name);
      }
      this.getYoutubeVideoId("movie");


    }, (err) => {
      this.spinner.hide();
      console.error(err.message);
    });
  }
  /**
   * gets the detail of current show
   *
   * @param {*} tvId
   * @memberof MovieComponent
   */
  public getTv(tvId) {
    this.movieService.getTvShowById(tvId).subscribe((res) => {
      this.movieData = res;
      this.movieName = res['name'];
      this.movieDescription = this.movieData.overview;
      this.movieInfo.title =this.movieData.original_title;
      this.movieInfo.poster_path = this.movieData.poster_path;
      this.movieInfo.release_date= res['first_air_date'].split('-')[0];
      this.moviePoster = this.baseImg + this.movieData.poster_path;
      this.movieRating = this.movieData.vote_average;

      this.movieGenre = [];
      for (const val of this.movieData.genres) {
        this.movieGenre.push(val.name);
      }
      this.getYoutubeVideoId("tv");
    }, (err) => {
      this.spinner.hide();
      console.error(err.message);
    });
  }


  /**
   *  gets video id of current movie/show trailer 
   *
   * @param {*} movieOrTv
   * @param {number} [tokenNo=1]
   * @memberof MovieComponent
   */
  public getYoutubeVideoId(movieOrTv, tokenNo = 1) {
    let apiToken;
    if (tokenNo <= environment.youtubeApiKeyArray.length) {
      apiToken = environment.youtubeApiKeyArray.filter((res) => res.id == tokenNo)[0]['token'];
      this.movieService.getTrailers(this.movieName, movieOrTv, apiToken).subscribe((res) => {
        this.spinner.hide();
        this.youtubeVideoList = res.items;
        this.videoId = this.youtubeVideoList[0].id.videoId;
        this.videoLink = `${this.youtubeURLPrefix}${this.videoId}${this.youtubeURLSuffix}`;
      }, (err) => {
        if (err.error.error.code == 403) {
          tokenNo = tokenNo + 1;
          this.getYoutubeVideoId(movieOrTv, tokenNo)
        }
        else {
          this.spinner.hide();
          alert("there was an error in fetching the data from youtube check your network connection");
          console.error(err);
        }

      }
      );

    }
    else {
      this.spinner.hide();
      alert("Youtube API key's limit has expired please try again tomorrow");
    }
  }


}
