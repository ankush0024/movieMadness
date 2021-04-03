// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseImgUrl: 'https://image.tmdb.org/t/p/w500/',
  baseApiUrl: 'https://api.themoviedb.org/3/',
  trendingMovieList: 'trending/movie/day',
  trendingTvShowList: 'trending/tv/day',
  searchMovie: 'search/movie',
  searchTv: 'search/tv',
  Youtube_Api_Url: 'https://www.googleapis.com/youtube/v3/search',
  movieByIdUrl: 'movie/',
  tvByIdUrl: 'tv/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
