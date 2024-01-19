import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-fecha-ventas',
  standalone: true,
  imports: [MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule],
  templateUrl: './fecha-ventas.component.html',
  styleUrl: './fecha-ventas.component.css'
})
export class FechaVentasComponent {

  fechaSeleccionada: Date = new Date;

  onDateChange(newDate: Date) {
    this.fechaSeleccionada = newDate;
    // Aquí puedes realizar la petición al backend con la fecha seleccionada
    console.log(`Fecha seleccionada: ${this.fechaSeleccionada}`);
  }
}
