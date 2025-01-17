import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-home',
  standalone: true,  
  imports: [CommonModule, FormsModule, ColorPickerModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {


  sliderValue1: number = 5;
  sliderValue2: number = 5;
  sliderValue3: number = 5;
  sliderValue4: number = 5;

  showText: boolean = false;  

  toggleText() {
    this.showText = !this.showText;  
  }
  selectedColor: string = "#000000";
}