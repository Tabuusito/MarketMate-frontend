import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CajasI } from '../modelos/cajas.interface';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  url: string = 'http://localhost:8080/cajas';

  constructor(private http: HttpClient) { }

  buscarPorMes(fecha: Date): Observable<CajasI[]> {
    let fechaFormatoLocal = fecha.getFullYear() + '-' + 
                            ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + 
                            ('0' + fecha.getDate()).slice(-2);
    let direccion = `${this.url}?fecha=${fechaFormatoLocal}`;
    return this.http.get<CajasI[]>(direccion);
  }
  
  buscarIngresosPorAnho(anho: number): Observable<number[]> {
    // Crear un arreglo de observables para cada mes del año
    const observables = [];

    for (let mes = 0; mes < 12; mes++) {
      const fecha = new Date(anho, mes, 1); // Usamos el primer día de cada mes
      observables.push(this.buscarPorMes(fecha));
    }

    // Usar forkJoin para ejecutar todas las llamadas en paralelo y esperar a que todas completen
    return forkJoin(observables).pipe(
      map(results => {
        // Convertir los resultados en un arreglo de ingresos por mes
        return results.map(monthData => {
          // Sumar el total de ingresos de cada mes
          return monthData.reduce((acc, current) => acc + current.total, 0);
        });
      })
    );
  }

  buscarIngresosPorTrimestre(anho: number): Observable<number[]> {
    const observables = [];

    for (let mes = 0; mes < 12; mes++) {
      const fecha = new Date(anho, mes, 1); // Usamos el primer día de cada mes
      observables.push(this.buscarPorMes(fecha));
    }

    // Usar forkJoin para ejecutar todas las llamadas en paralelo y esperar a que todas completen
    return forkJoin(observables).pipe(
      map(results => {
        // Agrupar los resultados mensuales en trimestres y sumar los totales
        const ingresosPorTrimestre = [];
        for (let i = 0; i < results.length; i += 3) {
          // Sumar los ingresos de cada trimestre (3 meses)
          const ingresosTrimestre = results.slice(i, i + 3).reduce((acc, currentMonth) => {
            // Sumar el total de ingresos de los meses en el trimestre actual
            const totalMes = currentMonth.reduce((accMes, currentCaja) => accMes + currentCaja.total, 0);
            return acc + totalMes;
          }, 0);
          ingresosPorTrimestre.push(ingresosTrimestre);
        }
        return ingresosPorTrimestre;
      })
    );
  }
}
