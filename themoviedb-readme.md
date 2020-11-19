# The Movie Database
## An API for requesting Movie Data online

The API requires you to sign up for an account and then request a developer key to use the service.

[API Documentation](https://www.themoviedb.org/documentation/api) 

[API Sign Up](https://www.themoviedb.org/account/signup) 

[Get an API Key](https://www.themoviedb.org/settings/api) 

[Attribution Info](https://www.themoviedb.org/about/logos-attribution) 

[API Getting Started Guide](https://developers.themoviedb.org/3/getting-started)

Each Application that you build will require an API key.
When you create/request your API key, use the type "education" for anything that we build for school.

### Images

Images require you to make a call to 
https://api.themoviedb.org/3/configuration?api_key={apikey}
to fetch the configuration info about the sizes of images, the base_url etc.

The base_url or secure_base_url will be //image.tmdb.org/t/p/
[Example Image URL](https://image.tmdb.org/t/p/w185/fg6fhyKg3vbdGtnf9Hq27Q5gS3r.jpg)
The second part of the path is the size of the image width
The third part is the unique URL for the image.

[API Search for Movie By Keyword](https://api.themoviedb.org/3/search/movie/?api_key={apikey}&query={keyword}&year={year}&language=en-US)
 
[API Movie Details](https://api.themoviedb.org/3/movie/{movie_id}?api_key={apikey})

[API Movie Recommendations](https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={apikey}&language=en-US)
