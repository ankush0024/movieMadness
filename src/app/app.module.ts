import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from '../components/about/about.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { TestComponent } from '../components/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from '../components/movie/movie.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PagenotfoundComponent,
    TestComponent,
    MovieComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
