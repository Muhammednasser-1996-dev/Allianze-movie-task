import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MoviesListRoutingModule } from './movies-list-routing.module';
import { MoviesListComponent } from './movies-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileDragNDropDirective } from 'src/app/shared/directives/dragDrop.directive';


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieFormComponent,
    FileDragNDropDirective
  ],
  imports: [
    CommonModule,
    MoviesListRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class MoviesListModule { }
