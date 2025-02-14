import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

export const appRoutes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' } // Rota padrão
];
