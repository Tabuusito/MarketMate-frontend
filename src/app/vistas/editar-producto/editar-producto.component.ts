import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosI } from '../../modelos/productos.interface';
import { InventarioService } from '../../servicios/inventario.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit{

  producto: ProductosI = {
    nombre: '',
    referencia: '',
    cantidad: 0,
    precio: 0,
    familia: 'papeleria',
    id: 0
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: InventarioService){}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.service.getById(productId).subscribe(
      (data: ProductosI) => {
        this.producto = data;
      },
      error => {
        console.error('Error al obtener el producto', error);
      }
    );
  }

  editProduct(): void {
    if (!this.validarFormulario(this.producto)) {
      alert('Por favor, completa todos los campos del formulario y asegúrate de que el precio sea positivo.');
      return;
    }
    this.service.updateProduct(this.producto.id, this.producto).subscribe(
      response => {
        console.log('Producto actualizado', response);
        this.router.navigate(['inventario']);
      },
      error => {
        console.error('Error al actualizar el producto', error);
        if (error.status === 400) {
          alert('Error: La referencia del producto ya existe.');
        } else {
          alert('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(['inventario']);
  }
  
  confirmDelete(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.deleteProduct();
    }
  }
  
  deleteProduct(): void {
    this.service.deleteProduct(this.producto.id).subscribe(
      response => {
        console.log('Producto eliminado');
        this.router.navigate(['inventario']);
      },
      error => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  
  validarFormulario(producto: ProductosI): boolean {
    return producto.nombre.trim() !== '' &&
           producto.referencia.trim() !== '' &&
           producto.cantidad != null &&
           producto.precio >= 0 &&
           producto.familia.trim() !== '';
  }
}
