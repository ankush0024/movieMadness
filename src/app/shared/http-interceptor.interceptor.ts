import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators'


@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const API_key: string = 'c30605bf20d63e4be66ebbc5422b595b&language=en-US';
    let updatedUrl;
    switch (true) {
      case request.url.includes('trending'):
      case request.url.includes('query'):
        updatedUrl = `${request.url}&api_key=${API_key}`;
        break;
      case request.url.includes('movie'):
      case request.url.includes('tv'):
        updatedUrl = `${request.url}?api_key=${API_key}`;
        break;
      default:
        updatedUrl = request.url;
    }
    return next.handle(request.clone({ url: updatedUrl })).pipe(catchError(this.handleError));
  }
  handleError(err) {
    if (err.status >= 500) {
      err.message='servor error';
    }
    else if (err.status >= 400 && err.status < 500) {
     err.message='network error!';
    }
    return throwError(err);
  }


}
