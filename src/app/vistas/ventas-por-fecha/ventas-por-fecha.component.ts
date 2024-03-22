import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../servicios/venta.service';
import { VentasI } from '../../modelos/ventas.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-ventas-por-fecha',
  standalone: true,
  imports: [CommonModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatInputModule,
            MatNativeDateModule,
            HeaderComponent,
            RouterOutlet],
  templateUrl: './ventas-por-fecha.component.html',
  styleUrls: ['./ventas-por-fecha.component.css']
})
export class VentasPorFechaComponent {
  ventas: VentasI[] = [];
  totalVentas: number = 0;

  constructor(private ventaService: VentaService) {}

  onDateChange(fecha: Date): void {
    this.ventaService.buscarPorFecha(fecha).subscribe(
      (ventas: VentasI[]) => {
        this.ventas = ventas;
        this.calcularTotalVentas();
      },
      error => {
        console.error('Error al buscar ventas', error);
      }
    );
  }

  calcularTotalVentas(): void {
    this.totalVentas = this.ventas.reduce((acumulado, venta) => {
      let subtotalVenta = venta.detalles.reduce((subtotal, detalle) => {
        return subtotal + (detalle.cantidad * detalle.precioUnitario);
      }, 0);
      return acumulado + subtotalVenta;
    }, 0);
  }
}

