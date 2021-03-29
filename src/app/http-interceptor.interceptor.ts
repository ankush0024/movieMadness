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
   const API_key:string='c30605bf20d63e4be66ebbc5422b595b';
   console.log(request.url);
   let updatedUrl=`${request.url}&api_key=${API_key}`;
  console.log(updatedUrl.includes('tv'));
  if(updatedUrl.includes('tv')){
    console.log("came here");
   // return next.handle(request.clone({url:updatedUrl})).pipe(map((ele)=>({...ele,title:`${ele['original_name']}`})))
   return next.handle(request.clone({url:updatedUrl})).pipe(map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
        event = event.clone({body: this.modifiedTVBody(event.body,"TV")});
    }
    return event;
}));
  }
  else{
    return next.handle(request.clone({url:updatedUrl})).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          event = event.clone({body: this.modifiedTVBody(event.body,"MOVIE")});
      }
      return event;
  }));
  }
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
