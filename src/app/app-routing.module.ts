import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from '../components/movieList/movieList.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { TestComponent } from '../components/test/test.component';
import { MovieComponent } from '../components/movie/movie.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: MovieListComponent },
      { path: 'movie/:id', component: MovieComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
