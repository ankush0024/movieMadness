import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public baseImgUrl = environment.baseImgUrl;
  public moviesArray: any = [];
  constructor() { }

  ngOnInit(): void {
    this.moviesArray=JSON.parse(localStorage.getItem('FavouriteMovie'));
  }

}
