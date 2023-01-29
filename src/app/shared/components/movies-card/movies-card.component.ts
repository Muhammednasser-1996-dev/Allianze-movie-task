import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Movie } from 'src/app/interfaces/movie';
import { MoviesService } from 'src/app/Services/movies.service';

@Component({
  selector: 'app-movies-card',
  templateUrl: './movies-card.component.html',
  styleUrls: ['./movies-card.component.scss']
})
export class MoviesCardComponent implements OnInit {

  @Input() movie: any
  isLoading: boolean = false
  flag: boolean = false

  constructor(private messageService: MessageService, private _MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.flag = this.movie.isFafourite
  }

  addToFavourites(movie: Movie) {
    this.isLoading = true
    // localStorage.setItem('favourites', JSON.stringify(movie))
    this._MoviesService.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    movie.isFafourite = !movie.isFafourite
    this.flag = movie.isFafourite
    console.log(movie.isFafourite);

    if (movie.isFafourite) {
      this._MoviesService.favourites.push(movie);
      localStorage.setItem('favourites', JSON.stringify(this._MoviesService.favourites))
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'this Movie is added to your favorites list',
      });
    } else {
      this._MoviesService.favourites = this._MoviesService.favourites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favourites', JSON.stringify(this._MoviesService.favourites))
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'this Movie is removed to your favorites list',
      });
    }

    this.isLoading = false
  }

}
