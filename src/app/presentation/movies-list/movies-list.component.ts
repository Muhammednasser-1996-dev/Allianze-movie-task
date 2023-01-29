import { Component, OnInit } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { MoviesService } from 'src/app/Services/movies.service';
import { tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  upcoming: Movie[] = [];
  topRated: Movie[] = [];
  nowPlaying: Movie[] = [];
  loadingIndicator: boolean = false;
  displayCreateDialog: boolean = false;
  imagePrefix: string = "https://image.tmdb.org/t/p/w500/"


  constructor(private _MoviesService: MoviesService, private datePipe: DatePipe) {
    this._MoviesService.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.getUpcomingMovies()
    this.getTopRated()
    this.getNowPalying()
  }

  getUpcomingMovies() {
    return this._MoviesService.getUpcomingMovies().pipe(

      finalize(() => {
        this.loadingIndicator = false;
      })
    ).subscribe(upcomingMovies => {
      this.upcoming = upcomingMovies?.results?.map((movie: any) => {
        let found: boolean = false;
        this._MoviesService.favourites.forEach((fav: any) => {
          if (movie.id === fav.id) {
            found = true;
          }
        });
        return this.mappedObject(movie, found)
      });
    })
  }


  getNowPalying() {
    return this._MoviesService.getNowPlayingMovies().pipe(
      finalize(() => {
        this.loadingIndicator = false;
      })
    ).subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying?.results?.map((movie: any) => {
        let found: boolean = false;
        this._MoviesService.favourites.forEach((fav: any) => {
          if (movie.id === fav.id) {
            found = true;
          }
        });
        return this.mappedObject(movie, found)
      });
    })
  }


  getTopRated() {
    this._MoviesService.getTopRatedMovies().pipe(
      finalize(() => {
        this.loadingIndicator = false;
      })
    ).subscribe(topRated => {
      this.topRated = topRated?.results?.map((movie: any) => {
        let found: boolean = false;
        this._MoviesService.favourites.forEach((fav: any) => {
          if (movie.id === fav.id) {
            found = true;
          }
        });
        return this.mappedObject(movie, found)
      });
    })
  }

  mappedObject(movie: any, found: boolean) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: this.imagePrefix + movie?.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      release_date: movie.release_date,
      isFafourite: found
    };
  }


  // open create dialog
  openCreateDialog() {
    this.displayCreateDialog = true
  }

  addToLis(data: any) {
    let createdMovie = {
      id: 1,
      title: data.title,
      overview: data.overview,
      poster: data.posterImage,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      release_date: this.datePipe.transform(
        data.release_date,
        'yyyy/MM/dd'
      ),
      isFafourite: false
    };
    if (Number(data.vote_average) > 8) {
      this.topRated.unshift(createdMovie)
    }

    if (new Date().getTime() < new Date(data.release_date).getTime()) {
      this.upcoming.unshift(createdMovie)
    }

    let date = new Date();
    let month = date.getMonth();
    date.setMonth(date.getMonth() - 2);
    var diff = (month + 12 - date.getMonth()) % 12;
    if (diff < 2) date.setDate(0)
    console.log(date);
    if (new Date().getTime() > new Date(data.release_date).getTime()
      && new Date(data.release_date).getTime() > (new Date(date).getTime())
    ) {
      this.nowPlaying.unshift(createdMovie)
    }
    console.log(new Date().getTime(), new Date(data.release_date).getTime(), new Date(date).getTime());

    // new Date(data.release_date).getTime()
  }

  close(flag: boolean) {
    this.displayCreateDialog = flag
  }

  ngOnInit(): void {
  }

}
