import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/shared/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public baseImg: any = 'https://image.tmdb.org/t/p/original/';
  public movieId: any = null;
  public movieData: any = null;
  public movieCreditData: any = null;
  constructor(private route: ActivatedRoute, private movie: MovieService) { }

  ngOnInit(): void {
    this.movieData = null;
    this.movieCreditData = null;
    this.route.params.subscribe((res) => {
      this.movieId = res.id;
      this.movie.getMovieData('https://api.themoviedb.org/3/movie/' + this.movieId).subscribe((res) => {
        this.movieData = res;
      });
      this.movie.getMovieData('https://api.themoviedb.org/3/movie/' + this.movieId + '/credits' ).subscribe((res) => {
        this.movieCreditData = res;
      });
    });
  }

}
