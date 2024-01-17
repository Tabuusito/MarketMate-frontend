import { Component, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { InventarioService } from '../../servicios/inventario.service';
import { VentaService } from '../../servicios/venta.service';
import { VentasI } from '../../modelos/ventas.interface';
import { detallesVentaI } from '../../modelos/detallesVenta.interface';
import { EditarDetalleComponent } from '../editar-detalle/editar-detalle.component';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent implements AfterViewInit {

  venta: VentasI;
  busqueda: string = '';
  @ViewChild('searchInput') searchInputElement!: ElementRef;

  constructor(private inventarioService: InventarioService, 
              private ventaService: VentaService,
              private router: Router,
              public dialog: MatDialog ) {
    this.venta = {
        id: 0,
        detalles: [],
        fechaHora: new Date(),
        total: 0
    };
}


ngAfterViewInit() {
  this.searchInputElement.nativeElement.focus();
}

  search(): void {
    this.inventarioService.getByRef(this.busqueda).pipe(
        catchError(error => {
            if (error.status === 404) {
                alert('Producto no encontrado');
            } else {
                alert('Error al buscar el producto');
            }
            return throwError(error);
        })
    ).subscribe(data => {
        // Buscar si ya existe un detalle con este producto
        const detalleExistente = this.venta.detalles.find(detalle => detalle.producto.id === data.id);

        if (detalleExistente) {
            detalleExistente.cantidad += 1;
        } else {
            const nuevoDetalle: detallesVentaI = {
                id: data.id, // Usando el ID del producto como ID del detalle
                producto: data,
                cantidad: 1,
                precioUnitario: data.precio
            };

            this.venta.detalles.push(nuevoDetalle);
        }

        this.actualizarTotal();
        this.searchInputElement.nativeElement.focus();
        this.searchInputElement.nativeElement.select();
    });
}


  private actualizarTotal(): void {
    let total = 0;
    this.venta.detalles.forEach(detalle => {
        total += detalle.precioUnitario * detalle.cantidad;
    });
    this.venta.total = total;
  }

  eliminarDetalle(detalleId: number): void {
    this.venta.detalles = this.venta.detalles.filter(detalle => detalle.id !== detalleId);
    this.actualizarTotal();
  }

  confirmVenta():void{
    if(confirm('¿Guardar venta?'))
      this.guardarVenta();
  }

  private guardarVenta(): void {
    if(this.venta.detalles.length > 0){
      this.ventaService.crearVenta(this.venta).subscribe(response => {
        console.log('Venta guardada', response);
        
        // Reinicializar la venta y la busqueda
        this.venta = {
            id: 0,
            detalles: [],
            fechaHora: new Date(),
            total: 0
        };
        this.busqueda = '';
  
        //alert('Venta registrada con éxito.');
  
      }, error => {
        alert('Error inesperado, por favor, inténtalo de nuevo.')
        console.error('Error al guardar la venta', error);
      });
    }
    else{
      alert('No hay elementos que registrar en esta venta.')
    }
    
  }

  abrirModalEditarDetalle(detalle: detallesVentaI) {
    const dialogRef = this.dialog.open(EditarDetalleComponent, {
      width: '500px',
      height: '280px',
      data: { detalle: detalle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Encuentra el índice del detalle en el array y lo actualiza
        const index = this.venta.detalles.findIndex(d => d.id === result.id);
        if (index !== -1) {
          this.venta.detalles[index] = result;
        }
      }
      this.actualizarTotal();
    });
  }
  

}
