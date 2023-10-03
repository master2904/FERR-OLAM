import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './admin.component';
import { FilterUPipe } from '../pipes/filter-u.pipe';
import { FilterLPipe } from '../pipes/filter-l.pipe';
import { FilterCliente } from '../pipes/filter-cliente.pipe';
import { FilterEPipe } from '../pipes/filter-e.pipe';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PerfilComponent } from './perfil/perfil.component';

import { PipeScorePipe } from './pipes/pipe-score.pipe';
import {MatCardModule} from '@angular/material/card';
import {CdkTreeModule} from '@angular/cdk/tree';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { FilterConcursoPipe } from './pipes/filter-concurso.pipe';
import { ImportarComponent } from './importar/importar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ReporteComponent } from './reporte/reporte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GanadoresComponent } from './ganadores/ganadores.component';
import { ButtonModule } from 'primeng/button';
import { ClienteComponent } from './cliente/cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
// import { PipeDPipe } from '../pipes/pipe-detalle.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrearProveedorComponent } from './proveedor/crear-proveedor/crear-proveedor.component';
import { EditarProveedorComponent } from './proveedor/editar-proveedor/editar-proveedor.component';
import { VerProductosComponent } from './proveedor/ver-productos/ver-productos.component';
import { CrearRelacionComponent } from './proveedor/crear-relacion/crear-relacion.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


// import { NgxChartModule } from 'ngx-chart';

@NgModule({
  declarations: [
    UsuarioComponent, 
    HomeComponent, 
    AdminComponent,
    FilterUPipe, 
    FilterLPipe, 
    FilterCliente, 
    FilterEPipe,
    // PipeDPipe,
    MenuComponent,
    PerfilComponent,         
    PipeScorePipe, 
    CrearUsuarioComponent, 
    EditarUsuarioComponent, 
    FilterConcursoPipe, ImportarComponent,
    ReporteComponent,
    ClienteComponent,
    ProveedorComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    CrearProveedorComponent,
    EditarProveedorComponent,
    VerProductosComponent,
    CrearRelacionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    LayoutModule,
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
    MaterialFileInputModule,
    MatAutocompleteModule
],
  exports:[
    AdminComponent
  ],
  entryComponents: []
})
export class AdminModule { }
