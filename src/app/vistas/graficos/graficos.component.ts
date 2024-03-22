import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css'
})
export class GraficosComponent {

  constructor(private router:Router){}

  redirectFamiliaProductos(){
    this.router.navigate(['graficos/familia-productos']);
  }

  redirectIngresosAnuales(){
    this.router.navigate(['graficos/ingresos-anuales']);
  }

  redirectRotacionInventario(){
    this.router.navigate(['graficos/rotacion-inventario']);
  }

  redirectIngresosTrimestrales(){
    this.router.navigate(['graficos/ingresos-trimestrales']);
  }
}
