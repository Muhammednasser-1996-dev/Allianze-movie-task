import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MoviesService } from 'src/app/Services/movies.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favouriteList: Movie[] = []
  imagePrefix: string = "https://image.tmdb.org/t/p/w500/"

  constructor(public _MoviesService: MoviesService) {
    this._MoviesService.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  ngOnInit(): void {
  }

}
