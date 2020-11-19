import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { TestComponent } from '../components/test/test.component';
import { MovieComponent } from '../components/movie/movie.component';
const routes: Routes = [
 // { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: '', component: AboutComponent },
  { path: 'test', component: TestComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
