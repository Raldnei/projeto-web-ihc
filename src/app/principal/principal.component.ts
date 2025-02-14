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
  exibirFormulario: number = 0;
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

  randomSize = 0;
  randomBorder = 0;
  randomBackgroundColor = '';
  randomGradientColor = '';
  randomCorrection = '';
  randomDrawingModule = '';
  randomMaskColor = '';
  
  constructor(private http: HttpClient) {}

  // Função para converter cor hexadecimal para RGB
  hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  preencherCamposRandom() {
    
    this.size = 8; 
    this.border = this.borderOptions[Math.floor(Math.random() * this.borderOptions.length)];
    this.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.gradientColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.correction = ['pequeno', 'muito_pequeno', 'grande', 'muito_grande'][Math.floor(Math.random() * 4)];
    this.drawingModule = Math.floor(Math.random() * 4) + 1; 
    this.maskColor = Math.floor(Math.random() * 2) + 1;
    this.gerarQrCode();

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
  alternarFormulario(tipo: number): void {
    this.exibirFormulario = tipo;
  }
}
