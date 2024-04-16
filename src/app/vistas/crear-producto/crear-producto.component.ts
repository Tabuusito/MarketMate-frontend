import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../servicios/inventario.service';
import { ProductosI } from '../../modelos/productos.interface';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {

  producto: ProductosI = {
    nombre: '',
    referencia: '',
    cantidad: 0,
    precio: 0,
    familia: '',
    id: 0,
    imagen:''
  }

  constructor(private router: Router, private service: InventarioService) {}

  ngOnInit(): void {

  }

  addProduct(): void {
    if (!this.validarFormulario(this.producto)) {
      alert('Por favor, completa todos los campos del formulario y asegúrate de que el precio sea positivo.');
      return;
    }
  
    this.service.createProduct(this.producto).subscribe(
      response => {
        console.log('Producto agregado', response);
        this.router.navigate(['inventario']);
      },
      error => {
        console.error('Error al agregar el producto', error);
        if (error.status === 400) {
          alert('Error: La referencia del producto ya existe.');
        } else {
          alert('Error al agregar el producto. Por favor, inténtalo de nuevo.');
        }
      }
    );
  }
  

  cancel(): void {
    this.router.navigate(['inventario']);
  }

  validarFormulario(producto: ProductosI): boolean {
    return producto.nombre.trim() !== '' &&
           producto.referencia.trim() !== '' &&
           producto.cantidad != null &&
           producto.precio >= 0 &&
           producto.familia.trim() !== '';
  }
}