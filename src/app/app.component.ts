import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from "./principal/principal.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, HttpClientModule, PrincipalComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projetinho';
  selectedColor: string = "#000000";
}