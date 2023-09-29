import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/model/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { VerProductosComponent } from './ver-productos/ver-productos.component';
import { CrearRelacionComponent } from './crear-relacion/crear-relacion.component';
import { RelacionService } from 'src/app/services/relacion.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  displayedColumns: string[] = ['nit', 'nombre','opcion'];
  // dataSource = ELEMENT_DATA;
  proveedores:Proveedor[];
  productos=[];
  detalle=[]
  constructor(private proveedor:ProveedorService, private relacion:RelacionService,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { 
  }
  ngOnInit(): void {
    this.proveedor.listar().subscribe((data:any[])=>{
      this.proveedores=data[0];
      this.productos=data[1];
    });
  }
  visto=false;
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
  agregar() {
    let data: Proveedor;
    const dialogo1 = this.dialog.open(CrearProveedorComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
       this.nuevo(art.value);
       else
       this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  cambiar(lab) {
    const dialogo1 = this.dialog.open(EditarProveedorComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  crear_relacion(){
  const dialogConfig = new MatDialogConfig();
  let x   =this.productos[this.fila]
  let y=this.proveedores[this.fila]
    dialogConfig.data={x,y};
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='450px';
    const dialogo1 = this.dialog.open(CrearRelacionComponent, dialogConfig);
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        console.log(art)
        // this.update(art.value,i,j)
        // this.toastr.success("")
      }
        // this.nuevo(art.value);
      else
        this.toastr.info('Operacion Cancelda');
      }
    );

  }
  
  ver() {
    let data: Proveedor;
    const dialogo1 = this.dialog.open(VerProductosComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
       this.nuevo(art.value);
       else
       this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  nuevo(datos){
    let form=datos;
    let formulario:Proveedor={id:0,nombre:form.nombre,apellido:form.apellido,celular:form.celular,empresa:form.empresa,observacion:form.observacion};
    console.log(formulario)
    this.proveedor.nuevo(formulario).subscribe((data:any)=>{
      this.proveedores=data[0];
      this.productos=data[1];
      this.toastr.success("Proveedor Agregado",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar el Proveedor",'Error!');
      // console.log(error.error);
    });
  }
  remove(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.proveedor.remove(id).subscribe((data:any)=>{
          this.proveedores=data[0];
          this.productos=data[1];
              this.toastr.success('Producto Eliminado','')
        });          
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  eliminar(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.proveedor.remove(id).subscribe((data:any)=>{
          this.proveedores=data[0];
          this.productos=data[1];
              this.toastr.success('Producto Eliminado','')
        });          
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  update(datos) {
    let form=datos;
    let formulario:Proveedor;
    // formulario=new Proveedor(form.id,form.nit,form.nombre,form.apellido);
    this.proveedor.update(formulario.id,formulario).subscribe((data:any)=>{
      this.proveedores=data[0];
      this.productos=data[1];
      this.toastr.success("Item Actualizado",'Exito!');
        });       
  }
  nombre=""
  fila=0
  mostrar(c,i){
    this.fila=i
    // console.log(c)
    this.nombre=c.nombre+" "+c.apellido
    this.visto=true
    this.detalle=this.productos[i];
  }
}
