import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Prevención Salud | Grupo Sancor Seguros',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
