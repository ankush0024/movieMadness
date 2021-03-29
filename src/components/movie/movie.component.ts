import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/shared/movie.service';

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
  public movieInfo = { id: '', poster_path: '', title: '' };
  constructor(private route: ActivatedRoute, private movie: MovieService) { }

  ngOnInit(): void {
    this.favouriteMovies = JSON.parse(localStorage.getItem('movie_favorites'));
    this.movieData = null;
    this.movieCreditData = null;
    this.route.params.subscribe((res) => {
      this.movieId = res.id;
      this.movieInfo.id = this.movieId;
      this.movie.getMovieData('https://api.themoviedb.org/3/movie/' + this.movieId).subscribe((res) => {
        this.movieData = res;
        this.movieGenre = [];
        for (const val of this.movieData.genres) {
          this.movieGenre.push(val.name);
        }
        this.movieDescription = this.movieData.overview;
        this.MovieTitle = this.movieData.original_title;
        this.movieInfo.title = this.MovieTitle;
        this.movieInfo.poster_path = this.movieData.poster_path;

        this.moviePoster = this.baseImg + this.movieData.poster_path;
        this.movieRating = this.movieData.vote_average;
      });
      this.movie.getMovieData('https://api.themoviedb.org/3/movie/' + this.movieId + '/credits').subscribe((res) => {
        this.movieCreditData = res;
        this.movieCast = this.movieCreditData.cast;
        this.movieDirectors = [];
        this.movieProducer = [];
        this.movieActors = [];
        for (const val of this.movieCast) {
          this.movieActors.push(val.original_name);
        }
        for (const val of this.movieCreditData.crew) {
          if (val.job === 'Director') {
            this.movieDirectors.push(val.name);
          }
          else if (val.job === 'Producer') {
            this.movieProducer.push(val.name);
          }
        }
      });
    });
  }
  test() {
    console.log(this.movieProducer);
  }
  public addFavourite() {
    console.log("f");
    this.favourite = !this.favourite;
    if (this.favourite) {
      this.favouriteMovies.push(this.movieInfo);
    }
    else {
      this.favouriteMovies= this.favouriteMovies.filter((ele) =>  ele.id !== this.movieInfo.id );
    }
    localStorage.setItem('movie_favorites', JSON.stringify(this.favouriteMovies));
  }
}
