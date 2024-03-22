import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentasI } from '../modelos/ventas.interface';
import { Observable, from, of } from 'rxjs';
import { mergeMap, reduce, catchError } from 'rxjs/operators';

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
  
  buscarPorMes(y: number, m: number): Observable<VentasI[]> {
    let inicioMes = new Date(y, m - 1, 1);
    let finMes = new Date(y, m, 0);
    let observables = [];

    for (let d = new Date(inicioMes); d <= finMes; d.setDate(d.getDate() + 1)) {
      let fechaFormatoLocal = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
      let direccion = `${this.url}buscarPorFecha?fecha=${fechaFormatoLocal}`;
      observables.push(this.http.get<VentasI[]>(direccion));
    }

    return from(observables).pipe(
      mergeMap(obs => obs),
      reduce<VentasI[], VentasI[]>((acc, val) => acc.concat(val), []),
      catchError(error => {
        console.error('Error al obtener ventas por mes', error);
        return of([]);
      })
    );
  }
  
}
