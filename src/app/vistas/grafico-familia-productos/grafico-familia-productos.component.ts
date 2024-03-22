import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-grafico-familia-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterOutlet],
  templateUrl: './grafico-familia-productos.component.html',
  styleUrls: ['./grafico-familia-productos.component.css']
})
export class GraficoFamiliaProductosComponent implements OnInit {

  selectedYear!: number;
  selectedMonth!: number;
  grafico!: Chart;
  years: number[] = [];
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

  constructor(private ventaService: VentaService) {}

  ngOnInit() {
    this.initializeYears();
    this.generateChart();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  generateChart(): void {
    this.grafico = new Chart('graficoFamiliaProductos', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Ingresos por familia de productos',
          data: [],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      }
    } as ChartConfiguration<keyof ChartTypeRegistry, (number | null)[], unknown>);
  }

  calculateIncomeByFamily() {
    if (this.selectedYear && this.selectedMonth) {
      this.ventaService.buscarPorMes(this.selectedYear, this.selectedMonth).subscribe(ventas => {
        const incomeByFamily: { [key: string]: number } = {"papeleria": 0, "libros": 0, "regalos": 0};

        ventas.forEach(venta => {
          venta.detalles.forEach(detalle => {
            const familia = detalle.producto.familia;
            const ingreso = detalle.cantidad * detalle.precioUnitario;
            if (incomeByFamily.hasOwnProperty(familia)) {
              incomeByFamily[familia] += ingreso;
            } else {
              incomeByFamily[familia] = ingreso;
            }
          });
        });

        this.updateChartData(incomeByFamily);
      });
    } else {
      console.error('Año o mes no seleccionado');
    }
  }

  updateChartData(incomeByFamily: { [key: string]: number }) {
    if (this.grafico) {
      this.grafico.data.datasets.forEach(dataset => {
        dataset.data = Object.values(incomeByFamily);
      });
      this.grafico.data.labels = Object.keys(incomeByFamily).filter(key => incomeByFamily[key] > 0);
      this.grafico.update();
    } else {
      console.error('El gráfico no ha sido inicializado');
    }
  }
  
}
