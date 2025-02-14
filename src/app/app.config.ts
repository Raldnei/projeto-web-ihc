import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: PrincipalComponent},  
    ]),
  ],
};