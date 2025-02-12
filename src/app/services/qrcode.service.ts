import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private http: HttpClient) { }


  generateQRCode(options: any): Observable<{ qrCodeUrl: string }> {
    return this.http.post<{ qrCodeUrl: string }>('/generate-qrcode', options);
  }
}
