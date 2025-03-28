import { Routes } from '@angular/router';
import { GloboTextoComponent } from './components/globo-texto/globo-texto.component';

export const routes: Routes = [
  { path: '', component: GloboTextoComponent },
  { path: '**', redirectTo: '' }
];
