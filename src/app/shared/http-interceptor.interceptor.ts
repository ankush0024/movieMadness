import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,filter, map } from 'rxjs/operators'



@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
   const API_key:string='c30605bf20d63e4be66ebbc5422b595b&language=en-US';
   console.log(request.url);
   let updatedUrl;
   if(request.url.includes('trending')||request.url.includes('query')){
    updatedUrl=`${request.url}&api_key=${API_key}`;
   }
   else if(request.url.includes('movie')||request.url.includes('tv')){
    updatedUrl=`${request.url}?api_key=${API_key}`;
   }
   else{
    updatedUrl=request.url;
   }
   
   return next.handle(request.clone({url:updatedUrl}));
  /* if(updatedUrl.includes('tv')){
   
   return next.handle(request.clone({url:updatedUrl})).pipe(map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
        event = event.clone({body: this.modifiedTVBody(event.body,"TV")});
    }
    return event;
}));
  }
  else if(updatedUrl.includes('movie')) {
    return next.handle(request.clone({url:updatedUrl})).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          event = event.clone({body: this.modifiedTVBody(event.body,"MOVIE")});
      }
      return event;
  }));
  }
  else{
    return next.handle(request.clone({url:updatedUrl}));
  } */
  }
  
  public modifiedTVBody(body,val){
    let newBody=body;
if(val==='TV'){
    const peopleWithFullName = newBody.results.filter((ele)=>(ele.backdrop_path!=undefined&&ele.backdrop_path!=null))
    .map(person => ({
      ...person,
      title: `${person.name}`
    }));
    newBody.results=[...peopleWithFullName]
  }
  else{
    const peopleWithFullName = newBody.results.filter((ele)=>(ele.backdrop_path!=undefined&&ele.backdrop_path!=null))
    newBody.results=[...peopleWithFullName]
  }
  //  arr.filter((person)=>(return person.age <= 40));
    return newBody;
  }

}
