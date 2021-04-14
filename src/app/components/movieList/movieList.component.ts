import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-movielist',
  templateUrl: './movieList.component.html',
  styleUrls: ['./movieList.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(private route: Router, private movieService: MovieService, private spinner: NgxSpinnerService) { }
  public baseImgUrl = environment.baseImgUrl;
  public testData: any = {};
  public moviesArray: any = [];
  public movieSearch: string;
  public isitFavouriteTab;
  public MovieOrTv: string;
  public searchFunSubject: Subject<any> = new Subject();
  public favouriteMovieArray: any;
  ngOnInit(): void {
    this.searchFunSubject.pipe(filter((res) => res.length > 2), debounceTime(500), distinctUntilChanged(), switchMap((res) => {
      this.spinner.show(); return this.SearcMovieOrShow(
        this.movieSearch
      )
    }
    )).subscribe(res => {
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
      this.moviesArray.push(...movieArray);
    },
      (err) => {
        this.spinner.hide();
        console.error(err)
      });
    if (!localStorage.getItem("MovieOrTv") || localStorage.getItem("MovieOrTv") == undefined) {
      localStorage.setItem("MovieOrTv", "movie");
    }
    this.MovieOrTv = localStorage.getItem("MovieOrTv");
    if (localStorage.getItem('FavouriteMovie')) {
      this.favouriteMovieArray = JSON.parse(localStorage.getItem('FavouriteMovie'));
    }
    else {
      this.favouriteMovieArray = [];

    }
    this.isitFavouriteTab = sessionStorage.getItem('favouriteTab');
    if (this.isitFavouriteTab == true) {
      // this.moviesArray = JSON.parse(localStorage.getItem('movie_favorites'));
    }
    else {
      this.getData();
    }
    this.movieSearch = null;
  }
  movieDetail(id) {
    this.route.navigate(['/home/movie', id]);
  }
  public NavigateToTest() {
    this.route.navigateByUrl('/test');
  }
  public getTrending(page) {
    if (this.MovieOrTv === 'movie') {
      return this.movieService
        .getTrendingMovieData(page);
    }
    else {
      return this.movieService
        .getTrendingTvData(page);
    }

  }
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
        // let movieArray=res['results'].filter((ele)=>ele.backdrop_path!=undefined&&ele.backdrop_path!=null);
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
  public SearcMovieOrShow(query) {
    if (this.MovieOrTv === 'movie') {
      return this.movieService.SearchMovie(query);
    }
    else {
      return this.movieService.SearchTv(query);
    }
  }
  public movieSearchfun(): void {
    if (this.movieSearch === '') {
      this.getData();
      return;
    }
    this.searchFunSubject.next(this.movieSearch);
  }
  public addToFav(val) {
    let temparr = [...this.favouriteMovieArray];
    if (temparr.filter((ele) => ele.title === val.title).length == 0) {
      this.favouriteMovieArray.push(val);
      localStorage.setItem('FavouriteMovie', JSON.stringify(this.favouriteMovieArray));
    }
  }
}
