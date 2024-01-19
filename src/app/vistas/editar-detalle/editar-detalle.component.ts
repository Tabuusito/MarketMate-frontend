import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para formularios
import { detallesVentaI } from '../../modelos/detallesVenta.interface';


@Component({
  selector: 'app-editar-detalle',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule,
            CommonModule,
            MatDialogModule
           ],
  templateUrl: './editar-detalle.component.html',
  styleUrl: './editar-detalle.component.css'
})
export class EditarDetalleComponent {

  detalle: detallesVentaI;
  mensajeError: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditarDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { detalle: detallesVentaI }
  ) {
    this.detalle = Object.assign({}, data.detalle); // Asignar una COPIA del detalle recibido a la propiedad del componente
  }

  guardarCambios() {
    if (this.detalle.cantidad <= 0) {
      this.mensajeError = 'La cantidad debe ser mayor que 0.';
      return;
    }
    if (this.detalle.precioUnitario < 0) {
      this.mensajeError = 'El precio debe ser mayor o igual a 0.';
      return;
    }
    
    this.mensajeError = '';
    this.dialogRef.close(this.detalle);
  }

}
