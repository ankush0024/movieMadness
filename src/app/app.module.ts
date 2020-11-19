import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from '../components/movieList/movieList.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { TestComponent } from '../components/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from '../components/movie/movie.component';
import {InputTextModule} from 'primeng/inputtext';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    PagenotfoundComponent,
    TestComponent,
    MovieComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [BrowserModule, InputTextModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
