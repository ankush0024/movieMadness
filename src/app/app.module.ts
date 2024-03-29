import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movieList/movieList.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './components/movie/movie.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HttpInterceptorInterceptor } from './shared/http-interceptor.interceptor';
import { SantisePipe } from './shared/santise.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { ServiceWorkerModule } from '@angular/service-worker';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { environment } from '../environments/environment';
import { RoundTenPipe } from './shared/round.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    PagenotfoundComponent,
    MovieComponent,
    HomeComponent, SantisePipe, RoundTenPipe
  ],
  imports: [BrowserModule, InputTextModule, BrowserAnimationsModule, AppRoutingModule, InfiniteScrollModule,
    HttpClientModule, FormsModule, NgxSpinnerModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
