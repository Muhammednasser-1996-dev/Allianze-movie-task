import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  SERVER_URL: string = environment.baseUrl;
  apiKey: string = environment.apiKey
  favourites: Movie[] = [];

  constructor(private _http: HttpClient) { }

  getUpcomingMovies(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}/upcoming?api_key=${this.apiKey}`);
  }
  getTopRatedMovies(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}/top_rated?api_key=${this.apiKey}`);
  }
  getNowPlayingMovies(): Observable<any> {
    return this._http.get(`${this.SERVER_URL}/now_playing?api_key=${this.apiKey}`);
  }

}
