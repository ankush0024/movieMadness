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
  tvByIdUrl: 'tv/',
  youtubeApiKeyArray: [{ id: 1, token: 'AIzaSyASPO73rBcODRYS6W2nln1CJo-2ctsS5Uc' }, { id: 2, token: 'AIzaSyBWX2H9CKxChFgsx51qWFiY0DvmeZF_Sgs' }, { id: 3, token: 'AIzaSyDGISOFymNHpJG9p69VPv3rmpu5jd9Boe4' }
    , { id: 4, token: 'AIzaSyAU6n4vc6scLulZO4iv2pZCdxfCGYg-FNQ' }
    , { id: 5, token: 'AIzaSyCgy6yOw1FtJpVgFn7zw6w6Hlf5Dk4fnBo' }
    , { id: 6, token: 'AIzaSyC7WH6qiirjcKlqr9b2O6dHTeaT2iMpqOk' }
    , { id: 7, token: 'AIzaSyBeZKi8libxULH18pb595zYEDlpF0fSevk' }
    , { id: 8, token: 'AIzaSyB77FLG7Q2tCenJEzQJGQjlQ8RdmG5jvOo' }
    , { id: 9, token: 'AIzaSyASPO73rBcODRYS6W2nln1CJo-2ctsS5Uc' }
    , { id: 10, token: 'AIzaSyDB-2WBVe5EjSZdDuli1Ggh1KdPJKj5KN0' }

  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
