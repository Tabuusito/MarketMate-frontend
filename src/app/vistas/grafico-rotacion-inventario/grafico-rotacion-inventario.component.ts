import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import { catchError, throwError } from 'rxjs';
import { InventarioService } from '../../servicios/inventario.service';
import { ProductosI } from '../../modelos/productos.interface';
import { VentasI } from '../../modelos/ventas.interface';
import { VentaService } from '../../servicios/venta.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-grafico-rotacion-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterOutlet],
  templateUrl: './grafico-rotacion-inventario.component.html',
  styleUrl: './grafico-rotacion-inventario.component.css'
})
export class GraficoRotacionInventarioComponent {
  producto!:ProductosI
  grafico!: Chart;
  selectedYear!: number;
  selectedMonth!: number;
  busquedaProducto!: string;
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ];
  years: number[] = [];

  constructor(private inventarioService: InventarioService,
              private ventaService: VentaService) {}

  ngOnInit() {
    this.initializeYears();
    //this.generateChart();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  generateChart(): void {
    if (!this.busquedaProducto || !this.selectedYear || !this.selectedMonth) {
        alert('Por favor, complete la búsqueda de producto, año y mes.');
        return;
    }

    this.inventarioService.getByRef(this.busquedaProducto).subscribe(producto => {
        this.producto = producto;

        this.ventaService.buscarPorMes(this.selectedYear, this.selectedMonth).subscribe(ventas => {
            let ventasFiltradas: VentasI[] = ventas.filter(venta => 
                venta.detalles.some(detalle => detalle.producto.referencia === this.busquedaProducto)
            );

            let datosGrafico = this.calcularRotacionInventario(ventasFiltradas, this.producto);

            this.grafico = new Chart('grafico', {
              type: 'line',
              data: {
                labels: datosGrafico.dias, // Días del mes
                datasets: [{
                  label: 'Rotación de Inventario',
                  data: datosGrafico.valoresRotacion, // Valores calculados de rotación
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }]
              }
            });
        });
    });
  }

  private calcularRotacionInventario(ventas: VentasI[], productoBuscado: ProductosI): { dias: string[], valoresRotacion: number[] } {
    let dias: string[] = [];
    let valoresRotacion: number[] = [];
    let ventasPorDia: Map<string, number> = new Map();

    // Inicializar la cantidad vendida total como 0
    let cantidadVendidaTotal = 0;

    ventas.forEach(venta => {
        let fecha = new Date(venta.fechaHora);
        let fechaStr = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;

        venta.detalles.forEach(detalle => {
            if (detalle.producto.referencia === productoBuscado.referencia) {
                // Sumar la cantidad vendida al total para este producto
                cantidadVendidaTotal += detalle.cantidad;
                ventasPorDia.set(fechaStr, (ventasPorDia.get(fechaStr) || 0) + detalle.cantidad);
            }
        });
    });

    // El stock actual corresponde a la cantidad del producto buscado
    let stockActual = productoBuscado.cantidad;

    // Calcular el promedio de stock como la suma del stock actual y la cantidad vendida total, dividido entre 2
    let promedioStock = (stockActual + cantidadVendidaTotal) / 2;

    if (promedioStock <= 0) {
        console.log("El promedio de stock calculado no es válido:", promedioStock);
        return { dias, valoresRotacion }; // Retornar arrays vacíos si el promedio no es válido
    }

    let inicioMes = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    let finMes = new Date(this.selectedYear, this.selectedMonth, 0);

    for (let d = new Date(inicioMes); d <= finMes; d.setDate(d.getDate() + 1)) {
        let fechaStr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        dias.push(fechaStr); // Añadir el día al arreglo de días

        let totalVentasDia = ventasPorDia.get(fechaStr) || 0;
        let rotacion = totalVentasDia / promedioStock; // Usar el promedio de stock calculado
        valoresRotacion.push(rotacion);
    }

    // Restaurar la fecha de inicioMes al final para evitar efectos secundarios
    inicioMes.setDate(1);

    return { dias, valoresRotacion };
}




    
}

