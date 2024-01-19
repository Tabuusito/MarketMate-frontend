import { Routes } from '@angular/router';
import { IndexComponent } from './vistas/index/index.component';
import { InventarioComponent } from './vistas/inventario/inventario.component';
import { EditarProductoComponent } from './vistas/editar-producto/editar-producto.component';
import { CrearProductoComponent } from './vistas/crear-producto/crear-producto.component';
import { VentaComponent } from './vistas/venta/venta.component';
import { FechaVentasComponent } from './vistas/fecha-ventas/fecha-ventas.component';

export const routes: Routes = [
  // { path: '**', component: PageNotFoundComponent },
  { path: '', component: IndexComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'inventario/editar/:id', component: EditarProductoComponent },
  { path: 'inventario/crear', component: CrearProductoComponent },
  { path: 'venta', component: VentaComponent },
  { path: 'fechaVentas', component: FechaVentasComponent }
  //{ path: '', redirectTo: '/inventario', pathMatch: 'full' }
];
