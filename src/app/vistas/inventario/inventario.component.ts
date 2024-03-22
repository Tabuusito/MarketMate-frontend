import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { RouterOutlet } from '@angular/router';

import { InventarioService } from '../../servicios/inventario.service';
import { ProductosI } from '../../modelos/productos.interface';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterOutlet],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  products: ProductosI[] = [];
  busqueda: string = '';

  constructor(private service: InventarioService, private router:Router) {}

  ngOnInit(): void {

  }

  search(): void {
    this.service.getByNameOrRef(this.busqueda).subscribe(data => {
      this.products = data;
    });
  }

  productDetails(id:number){
    this.router.navigate(['inventario/editar', id]);
  }

  createProduct(){
    this.router.navigate(['inventario/crear']);
  }
}
