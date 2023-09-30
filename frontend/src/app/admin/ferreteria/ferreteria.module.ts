import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FerreteriaRoutingModule } from './ferreteria-routing.module';
import { FerreteriaComponent } from './ferreteria.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ProductoComponent } from './producto/producto.component';
import { TipoComponent } from './tipo/tipo.component';
import { InventarioComponent } from './inventario/inventario.component';
import { VentaComponent } from './venta/venta.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
// import { MenuComponent } from '../menu/menu.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterCliente } from 'src/app/pipes/filter-cliente.pipe'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearDetalleComponent } from './detalle/crear-detalle/crear-detalle.component';
import { EditarDetalleComponent } from './detalle/editar-detalle/editar-detalle.component';
import { EditarTipoComponent } from './tipo/editar-tipo/editar-tipo.component';
import { CrearTipoComponent } from './tipo/crear-tipo/crear-tipo.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { HistorialComponent } from './historial/historial.component';
// import { PipeDPipe } from 'src/app/pipes/pipe-detalle.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RegistrarComponent } from './inventario/registrar/registrar.component';
import { VerComponent } from './historial/ver/ver.component';
import { ClienteComponent } from './venta/cliente/cliente.component';
import { ReporteProductoMesComponent } from './reporte-producto-mes/reporte-producto-mes.component';
import { ImgRotaDirective } from './img-rota.directive';



const router:Routes=[];

@NgModule({
  declarations: [FerreteriaComponent,
    DetalleComponent,
    // PipeDPipe,
    ProductoComponent,
    TipoComponent,
    InventarioComponent,
    VentaComponent,
    MenuComponent,
    CrearDetalleComponent,
    EditarDetalleComponent,
    EditarTipoComponent,
    CrearTipoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    HistorialComponent, 
    RegistrarComponent, 
    VerComponent, 
    ClienteComponent, 
    ReporteProductoMesComponent, ImgRotaDirective
  ],
  imports: [
    CommonModule,
    FerreteriaRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    LayoutModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CdkTreeModule,
    MatDatepickerModule,
    MatMenuModule,
    NgxChartsModule,
    ConfirmDialogModule,
    MatDatepickerModule,
    ButtonModule,
    MatExpansionModule,
    MatTableModule,
    ScrollingModule   ,
    MaterialFileInputModule,
    NgxChartsModule,


  ],  
  exports:[
    FerreteriaComponent
  ],
  entryComponents: []
})
export class FerreteriaModule { }
