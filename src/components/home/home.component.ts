import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('movie_favorites', JSON.stringify([]));
    sessionStorage.setItem('favouriteTab', JSON.stringify(false));
  }

}
