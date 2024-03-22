import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { CajaService } from '../../servicios/caja.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-grafico-ingresos-trimestrales',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterOutlet],
  templateUrl: './grafico-ingresos-trimestrales.component.html',
  styleUrl: './grafico-ingresos-trimestrales.component.css'
})
export class GraficoIngresosTrimestralesComponent implements OnInit{
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];
  grafico!: Chart;

  constructor(private cajaService: CajaService) {}

  ngOnInit(): void {
    this.initializeYears(); // Inicializa la lista de años si es dinámica
  }

  initializeYears() {
    // Inicializar los años aquí, por ejemplo, los últimos 10 años desde el actual
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: 10}, (_, i) => currentYear - i).reverse();
  }

  generateChart(): void {
    this.cajaService.buscarIngresosPorTrimestre(this.selectedYear).subscribe(ingresosPorTrimestre => {
      const trimestres = ['T1', 'T2', 'T3', 'T4'];
      
      if(this.grafico) {
        this.grafico.destroy(); // Destruir el gráfico anterior si existe
      }
      
      this.grafico = new Chart('grafico', {
        type: 'bar',
        data: {
          labels: trimestres,
          datasets: [{
            label: 'Ingresos por trimestre',
            data: ingresosPorTrimestre,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}
