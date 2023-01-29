import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from './ui-modules/theme.modules';
import { MoviesCardComponent } from './components/movies-card/movies-card.component';
import { ScreenHeaderComponent } from './components/screen-header/screen-header.component';




@NgModule({
  declarations: [
    MoviesCardComponent,
    ScreenHeaderComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  exports: [
    ThemeModule,
    MoviesCardComponent,
    ScreenHeaderComponent
  ]
})
export class SharedModule { }
