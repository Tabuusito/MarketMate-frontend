import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CajasI } from '../modelos/cajas.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  url:string = 'http://localhost:8080/cajas';

  constructor(private http:HttpClient) { }

  buscarPorMes(fecha: Date): Observable<CajasI[]> {
    // Formatear la fecha para enviar solo la parte de la fecha (yyyy-MM-dd)
    let fechaFormatoLocal = fecha.getFullYear() + '-' + 
                            ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + 
                            ('0' + fecha.getDate()).slice(-2);
    let direccion = `${this.url}?fecha=${fechaFormatoLocal}`;
    return this.http.get<CajasI[]>(direccion);
  }
  
  
}
