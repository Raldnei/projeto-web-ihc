import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { PrincipalComponent } from './app/principal/principal.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';


bootstrapApplication(PrincipalComponent, {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(),
    HttpClientModule, 
 
  ]
}).catch(err => console.error(err));
