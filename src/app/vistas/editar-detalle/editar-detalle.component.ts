import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para formularios
import { MatFormFieldModule } from '@angular/material/form-field'; // Para campos de formulario
import { MatInputModule } from '@angular/material/input'; // Para inputs de Material
import { MatButtonModule } from '@angular/material/button'; // Para botones de Material
import { MatIconModule } from '@angular/material/icon'; // Si necesitas íconos
import { detallesVentaI } from '../../modelos/detallesVenta.interface';


@Component({
  selector: 'app-editar-detalle',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule],
  templateUrl: './editar-detalle.component.html',
  styleUrl: './editar-detalle.component.css'
})
export class EditarDetalleComponent {

  detalle: detallesVentaI;

  constructor(
    public dialogRef: MatDialogRef<EditarDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { detalle: detallesVentaI }
  ) {
    this.detalle = Object.assign({}, data.detalle); // Asignar una copia del detalle recibido a la propiedad del componente
  }

  guardarCambios() {
    this.dialogRef.close(this.detalle);
  }

}
