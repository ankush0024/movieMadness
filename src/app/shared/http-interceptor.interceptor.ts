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
  }
}
