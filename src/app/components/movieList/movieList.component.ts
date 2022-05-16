import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-movielist',
  templateUrl: './movieList.component.html',
  styleUrls: ['./movieList.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(private route: Router, private movieService: MovieService, private spinner: NgxSpinnerService) { }
  public baseImgUrl = environment.MovieListPosterBaseUrl;
  public testData: any = {};
  public moviesArray: any = [];
  public movieSearch: string;
  public MovieOrTv: string;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  ngOnInit(): void {
    if (!localStorage.getItem("MovieOrTv") || localStorage.getItem("MovieOrTv") == undefined) {
      localStorage.setItem("MovieOrTv", "movie");
    }
    this.MovieOrTv = localStorage.getItem("MovieOrTv");
    this.getData();
    this.movieSearch = null;
  }

/**
 * navigates to movie detail page
 * 
 * @param {*} id
 * @memberof MovieListComponent
 */
public NavigateToMovieDetailPage(id) {
    this.route.navigate(['/home/movie', id]);
  }


  /**
   * returns observable to search trending movie/show 
   *
   * @param {*} page
   * @return {*} 
   * @memberof MovieListComponent
   */
  public getTrending(page) {
    if (this.MovieOrTv === 'movie') {
      return this.movieService
        .getTrendingMovies(page);
    }
    else {
      return this.movieService
        .getTrendingTvShows(page);
    }
  }
  /**
   * gets the list of trending movie/show 
   *
   * @memberof MovieListComponent
   */
  public getData() {
    this.spinner.show();
    localStorage.setItem("MovieOrTv", this.MovieOrTv);
    this.getTrending(1)
      .subscribe((res) => {
        this.spinner.hide();
        this.testData = res;
        let movieArray;
        if (this.MovieOrTv === 'movie') {
          movieArray = res['results'].filter((ele) => ele.backdrop_path != undefined && ele.backdrop_path != null)
        }
        else {
          movieArray = res['results'].filter((ele) => ele.backdrop_path != undefined && ele.backdrop_path != null).map(person => ({
            ...person,
            title: `${person.name}`
          }));
        }
        this.moviesArray = [...movieArray];
      }
        , (err) => {
          this.spinner.hide();
          console.error(err);
        });
  }

  /**
   * loads more trending movie/shows
   *
   * @return {*} 
   * @memberof MovieListComponent
   */
  public loadMore() {
    if (this.movieSearch !== '' && this.movieSearch !== null) {
      return;
    }
    const pageNo = this.testData.page + 1;
    this.spinner.show();
    this.getTrending(
      pageNo,
    )
      .subscribe((res) => {
        this.spinner.hide();
        this.testData = res;
        let movieArray;
        if (this.MovieOrTv === 'movie') {
          movieArray = res['results'].filter((ele) => ele.backdrop_path != undefined && ele.backdrop_path != null)
        }
        else {
          movieArray = res['results'].filter((ele) => ele.backdrop_path != undefined && ele.backdrop_path != null).map(person => ({
            ...person,
            title: `${person.name}`
          }));
        }
        this.moviesArray.push(...movieArray);
      }, (error) => {
        this.spinner.hide();
        console.error(error);
      });
  }

  /**
   * return the observable to search movie/show based on user selection
   *
   * @param {*} query
   * @return {*} 
   * @memberof MovieListComponent
   */
  public SearcMovieOrShow(query) {
    if (this.MovieOrTv === 'movie') {
      return this.movieService.SearchMoviesByName(query);
    }
    else {
      return this.movieService.SearchTvShowsByName(query);
    }
  }

  /**
   * gets the data of searched movie/show
   *
   * @return {*}  {void}
   * @memberof MovieListComponent
   */
  public movieSearchfun(): void {
    if (this.movieSearch === '') {
      this.getData();
      return;
    }
    this.spinner.show();
    this.SearcMovieOrShow(
      this.movieSearch
    )
      .subscribe(res => {
        this.spinner.hide();

        this.moviesArray = [];
        let movieArray;
        if (this.MovieOrTv === 'movie') {
          movieArray = res['results'].filter((ele) => ele.backdrop_path != undefined && ele.backdrop_path != null)
        }
        else {
          movieArray = res['results'].filter((ele) => ele.backdrop_path != undefined && ele.backdrop_path != null).map(person => ({
            ...person,
            title: `${person.name}`
          }));
        }
        this.moviesArray = [...movieArray];
      },
        (err) => {
          this.spinner.hide();
          console.error(err)
        });
  }


  onScrollDown() {
    this.loadMore();
  }
}
