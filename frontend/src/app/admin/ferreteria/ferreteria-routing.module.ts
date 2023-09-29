import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FerreteriaComponent } from './ferreteria.component';
import { DetalleComponent } from './detalle/detalle.component';
import { InventarioComponent } from './inventario/inventario.component'; 
import { ProductoComponent } from './producto/producto.component';
import { TipoComponent } from './tipo/tipo.component';
import { VentaComponent } from './venta/venta.component';
import { HistorialComponent } from './historial/historial.component';
import { ReporteProductoMesComponent } from './reporte-producto-mes/reporte-producto-mes.component';


const routes: Routes = [
  {component:FerreteriaComponent,
    path:'',
    // {
    children:[
      {path:'detalle',component:DetalleComponent},
      {path:'inventario',component:InventarioComponent},
      {path:'producto',component:ProductoComponent},
      {path:'tipo',component:TipoComponent},
      {path:'venta',component:VentaComponent},
      {path:'venta/historial',component:HistorialComponent},
      {path:'venta/producto',component:ReporteProductoMesComponent},
      // {path:'**',redirectTo:'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FerreteriaRoutingModule { }
