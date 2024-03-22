import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { CajaService } from '../../servicios/caja.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-grafico-ingresos-anuales',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterOutlet],
  templateUrl: './grafico-ingresos-anuales.component.html',
  styleUrls: ['./grafico-ingresos-anuales.component.css']
})
export class GraficoIngresosAnualesComponent implements OnInit {
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
    this.cajaService.buscarIngresosPorAnho(this.selectedYear).subscribe(data => {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
      if(this.grafico) {
        this.grafico.destroy(); // Destruir el gráfico anterior si existe
      }

      this.grafico = new Chart('grafico', {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Ingresos por mes',
              data: data
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // Asegurarse de que la escala de y comience en 0
            }
          }
        }
      });
    });
  }
}
