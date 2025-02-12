import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  
import { ColorPickerModule } from 'ngx-color-picker';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-home',
  standalone: true,  
  imports: [CommonModule, FormsModule, ColorPickerModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  modeState: number = 0; // 0 = IA, 1 = Manual

  sliderValue1: number = 5;
  sliderValue2: number = 5;
  sliderValue3: number = 5;
  sliderValue4: number = 5;

  descricao: string = '';  
  qrCodeUrl: string = '';  
  selectedColor: string = "#000000"; // Cor do QR Code
  selectedBgColor: string = "#FFFFFF"; // Cor de fundo do QR Code

  isLoading: boolean = false;  

  setMode(mode: number): void {
    this.modeState = mode;
  }

  generateQRCode(): void {
    this.isLoading = true;  

    // Opções para gerar o QR Code com cor e fundo personalizados
    const qrCodeOptions = {
      errorCorrectionLevel: 'H',
      width: 200,
      color: {
        dark: this.selectedColor,  // Cor do QR Code
        light: this.selectedBgColor  // Cor de fundo
      }
    };

    // Gerar o QR Code com as opções definidas
    QRCode.toDataURL(this.descricao, qrCodeOptions, (err: any, url: string) => {
      this.isLoading = false;  
      if (err) {
        console.error('Erro ao gerar QR Code:', err);
      } else {
        this.qrCodeUrl = url;  // Definir o URL do QR Code gerado
      }
    });
  }
}
