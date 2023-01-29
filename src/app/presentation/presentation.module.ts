import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../core/layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'moviesList',
        pathMatch: 'full',
      },
      {
        path: 'moviesList',
        loadChildren: () =>
          import('./movies-list/movies-list.module').then((m) => m.MoviesListModule),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('./favourites/favourites.module').then((m) => m.FavouritesModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ],
})
export class PresentationModule { }
