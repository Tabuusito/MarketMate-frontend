import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CajasI } from '../../modelos/cajas.interface';
import { CajaService } from '../../servicios/caja.service';

@Component({
  selector: 'app-cajas-mes',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cajas-mes.component.html',
  styleUrls: ['./cajas-mes.component.css']
})
export class CajasMesComponent implements OnInit {
  cajas: any[] = [];
  mesSeleccionado = new FormControl();
  anhoSeleccionado = new FormControl();

  constructor(private cajaService: CajaService) {}

  ngOnInit(): void {}

  buscarCajas() {
    const fecha = new Date(this.anhoSeleccionado.value, this.mesSeleccionado.value - 1, 1);
    this.cajaService.buscarPorMes(fecha).subscribe(cajas => {
      this.cajas = this.completarDiasDelMes(cajas, fecha);
    });
  }

  completarDiasDelMes(cajas: CajasI[], fecha: Date): any[] {
    const mes = fecha.getMonth();
    const anho = fecha.getFullYear();
    const totalDias = new Date(anho, mes + 1, 0).getDate();
    const cajasPorDia: any[] = [];

    for (let dia = 1; dia <= totalDias; dia++) {
      const fechaDia = new Date(anho, mes, dia);
      const fechaDiaStr = fechaDia.toISOString().split('T')[0];
      const cajaEncontrada = cajas.find(c => 
        new Date(c.fecha).setHours(0,0,0,0) === fechaDia.setHours(0,0,0,0));      

      if (cajaEncontrada) {
        cajasPorDia.push(cajaEncontrada);
      } else {
        cajasPorDia.push({
          fecha: fechaDia,
          primerTicket: { id: 'No hay' },
          ultimoTicket: { id: 'No hay' },
          total: 0
        });
      }
    }

    return cajasPorDia.map(c => ({
      ...c,
      fecha: c.fecha instanceof Date ? c.fecha : new Date(c.fecha), // Asegura que la fecha es un objeto Date
      primerTicket: c.primerTicket?.id ? c.primerTicket : { id: 'No hay' },
      ultimoTicket: c.ultimoTicket?.id ? c.ultimoTicket : { id: 'No hay' },
      total: c.total ? c.total : 0
    }));
  }
}
