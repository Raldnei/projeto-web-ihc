import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-principal',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  content: string = '';
  size: number = 8;
  sizeOptions: number[] = [4, 6, 8, 10];
  border: number = 2;
  borderOptions: number[] = [2, 4, 6];
  correction: string = 'pequeno';
  primaryColor: string = '#000000'; 
  backgroundColor: string = '#FFFFFF'; 
  gradientColor: string = '#FF5733'; 
  drawingModule: number = 1;
  maskColor: number = 1;
  qrCodePath: string = '';

  constructor(private http: HttpClient) {}

  // Função para converter cor hexadecimal para RGB
  hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  

  gerarQrCode() {
    const requestBody = {
      conteudo: this.content,
      tamanho: this.size,
      borda: this.border,
      correcao: this.correction,
      corPrincipal: this.hexToRgb(this.primaryColor),  // Converter para RGB
      corFundo: this.hexToRgb(this.backgroundColor),  
      corGradiente: this.hexToRgb(this.gradientColor),  
      moduloDesenho: Number(this.drawingModule),
      mascaraCor: Number(this.maskColor)
    };

    console.log(requestBody);  

    this.http.post<{ caminho: string }>('http://localhost:3000/gerar-qrcode', requestBody)
      .subscribe(response => {
        this.qrCodePath = response.caminho;
      }, error => {
        console.error('Erro ao gerar QR Code:', error);
      });
  }
}

