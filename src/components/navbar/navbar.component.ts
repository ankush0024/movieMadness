import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public movieSearch: string;
  public favoriteTab:string;
  constructor(private http: HttpClient,private  route:Router) { }

  ngOnInit(): void {
    this.movieSearch = null;
    this.favoriteTab=sessionStorage.getItem('favouriteTab');
  }
  public routeToFavourite() {
   this.route.navigate(['/home/favourite']);
   
  }
  public routetoTrending() {
    sessionStorage.setItem('favouriteTab', JSON.stringify(false));
    this.favoriteTab=sessionStorage.getItem('favouriteTab');
  }
  
}
