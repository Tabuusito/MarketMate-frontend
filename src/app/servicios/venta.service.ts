import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentasI } from '../modelos/ventas.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url:string = 'http://localhost:8080/ventas/';

  constructor(private http:HttpClient) { }

  crearVenta(venta:VentasI){
    let direccion = this.url + 'crear'
    return this.http.post<VentasI>(direccion, venta);
  }

  buscarPorFecha(fecha: Date): Observable<VentasI[]> {
    // Formatear la fecha para enviar solo la parte de la fecha (yyyy-MM-dd)
    let fechaFormatoLocal = fecha.getFullYear() + '-' + 
                            ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + 
                            ('0' + fecha.getDate()).slice(-2);
    let direccion = `${this.url}buscarPorFecha?fecha=${fechaFormatoLocal}`;
    return this.http.get<VentasI[]>(direccion);
  }
  
  
}
