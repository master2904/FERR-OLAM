import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { Cliente } from 'src/app/model/cliente';
import { Historial } from 'src/app/model/historial';
import { Usuario } from 'src/app/model/usuario';
import { Venta } from 'src/app/model/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { VentaService } from 'src/app/services/venta.service';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  title = 'Producto';
  constructor(private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private detalle:DetalleService,private cliente:ClienteService,private venta:VentaService) { 
  }
  createFormGroup(){
    return new FormGroup({
      nit: new FormControl(""),
      cantidad:new FormControl('',[Validators.required,Validators.min(1)]),
      id_detalle:new FormControl('',Validators.required),
      producto: new FormControl("",Validators.required),
      precio: new FormControl("",Validators.required),
      nombre: new FormControl("")    ,
    });
  }
  nuevo:FormGroup;
  filtroProducto: Observable<any[]>;
  filtro_productos: any[] = [];
  ventas =[];
  detalles=[];
  matriz:Historial[]=[]
  f_productos ={id:null,nombre:null,imagen:null}; 
  f_tipos ={id:null,id_producto:null,descripcion:null}; 
  total=0
  vender=0
  sig=0
  f={cliente:null,venta:null,historial:null};

  // get nombre(){return this.nuevo.get('nombre'); }
  // get nit(){return this.nuevo.get('nit'); }
  get producto(){return this.nuevo.get('producto'); }
  get cantidad(){return this.nuevo.get('cantidad'); }
  get precio(){return this.nuevo.get('precio'); }
  get id_detalle(){return this.nuevo.get('id_detalle'); }
  usuario:Usuario
  private _filter_producto(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.detalles.filter(option => (option.descripcion).toLowerCase().includes(filterValue));
  }
  cargar(){
    this.filtroProducto = this.producto.valueChanges.pipe(
      startWith(''),
      map(value => this._filter_producto(value || '')),
    );
    this.detalle.listar_ventas(1).subscribe((data:any)=>{
      this.detalles=data;
      this.filtro_productos = this.detalles.map(w => {
        console.log(w)
        return {w};
        // id:w.id,descripcion:w.descripcion,codigo:w.codigo,value:w.id,stock:w.stock,precio:w.precio_venta};
      })
    });
  }
  ngOnInit(): void {
    this.nuevo=this.createFormGroup();
    this.cargar();
  }
  public form={id:null,id_usuario:null,codigo:null,id_cliente:null,id_detalle:null,nit:null,nombre:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,sub_total:null,fecha:null};
  setear_producto(s){
    this.form.id_detalle=s.id;
    this.form.descripcion=s.descripcion;
    this.form.codigo=s.codigo;
    this.form.cantidad=s.stock;
    this.form.precio_compra=s.precio_compra;
    this.form.precio_venta=s.precio_venta;
    this.nuevo.controls['id_detalle'].setValue(s.id)
    this.nuevo.controls['producto'].setValue(s.descripcion)
    this.nuevo.controls['precio'].setValue(s.precio_venta)
    this.nuevo.controls['cantidad'].setValue(s.stock)
  }
  nuevo_producto(e){
      this.nuevo.controls['producto'].setValue(e)
  }
  carrito(){
    this.vender++
    let formulario_historial:Historial={id:0,cantidad:0,id_detalle:0,id_venta:0,precio_compra:0,precio_venta:0,sub_total_compra:0,sub_total_venta:0};
    let formulario={id:0,codigo:null,id_detalle:null,descripcion:null,cantidad:null,precio:null,sub_total:null,fecha:null};
    formulario_historial.cantidad=this.cantidad.value;
    formulario_historial.id_detalle=this.form.id_detalle;
    formulario_historial.precio_compra=this.form.precio_compra;
    formulario_historial.precio_venta=this.form.precio_venta;
    formulario_historial.sub_total_compra=formulario_historial.precio_compra*formulario_historial.cantidad;
    formulario_historial.sub_total_venta=formulario_historial.precio_venta*formulario_historial.cantidad;
    this.total+=formulario_historial.sub_total_venta
    this.form.id_usuario=+localStorage.getItem('data')
    formulario.id=this.form.id;
    formulario.id_detalle=this.form.id_detalle;
    formulario.cantidad=this.form.cantidad;
    formulario.codigo=this.form.codigo;
    formulario.descripcion=this.form.descripcion;
    let v=[];
    v.push(this.form.codigo)
    v.push(this.form.descripcion)
    v.push(formulario_historial.cantidad)
    v.push(formulario_historial.precio_venta)
    v.push(formulario_historial.sub_total_venta)
    this.ventas.push(v);
    this.cantidad.setValue('')
    this.precio.setValue('')
    this.producto.setValue('')
    this.matriz.push(formulario_historial)
  } 
  validar(e){
    if(this.form.cantidad<e)
      this.nuevo.get('cantidad').setErrors({'max':this.form.cantidad})
  }
  error_cantidad(){
    if(this.cantidad.hasError('required'))
      return "Campo Obligatorio";
    if(this.cantidad.hasError("min"))
      return "Cantidad Invalida"
    if(this.cantidad.hasError('max'))
      console.log(this.cantidad.status)
      return "Cantidad insuficiente en almacen";
    return "";
  }
  error_precio(){
    if(this.precio.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  error_producto(){
    if(this.producto.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }

  eliminar(pos){
    console.log(pos)
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea quitar este Item?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.total-=this.ventas[pos][4]
        this.ventas.splice(pos,1);
        this.matriz.splice(pos,1);
        this.toastr.warning('Item Removido')
      }
      else
        this.toastr.info('Operacion Cancelada');
    }); 
  }
  realizar_venta(){
    let nit,nombre,id
    nit=localStorage.getItem('n1')
    nombre=localStorage.getItem('n2')
    id=localStorage.getItem('n3')
    let formulario_cLiente:Cliente={id:(+id),nit:nit,nombre:nombre}
    let fecha:Date;
    fecha = new Date;
    let fecha1=""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate());
    let formulario_venta:Venta={id:0,id_cliente:+localStorage.getItem('n3'),id_usuario:+localStorage.getItem('data'),fecha:fecha1};
    // f={cliente:null,venta:null,historial:null};
    this.f.cliente=formulario_cLiente;
    this.f.venta=formulario_venta;
    this.f.historial=this.matriz;
    // console.log(f)
    this.venta.nuevo(this.f).subscribe(data=>{
      console.log(data)
      this.pdf(data);
      this.toastr.success("Venta Realizada","Exito");
      location.reload();
    },
    error=>{
      let e=error.status;
      console.log(e)
      this.toastr.error("error","No se pudo realizar la venta")
    }
    )  
  }
  pdf(data){
      let v=data[0][0]
      let h=data[1][0]
      let datos=[]
      let c=1
      console.log(h)
      h.forEach(w => {
        let t=[]
        t.push(c++)
        t.push(w.id_detalle)
        t.push(w.cantidad)
        t.push(w.precio_venta)
        t.push(w.sub_total_venta)
        datos.push(t)
      });
      let t=["TOTAL","","","",v.total_venta]
      datos.push(t)
      console.log(datos)
      let fecha=new Date();
      const titulo="venta "+fecha;
      const doc = new jsPDF('p', 'pt', 'letter');
      doc.setFont('helvetica','bold')
      doc.setFontSize(15);
      // doc.text("COMERCIAL FERR-OLAM",210,25);
      // doc.text("VENTA",270,50);
      doc.setFont('helvetica','normal')
      doc.setFontSize(9);
      doc.text("NIT/CI:_________________________________________________",30,60);
      doc.text("Nombre:________________________________________________",30,80);
      doc.text(v.nit,70,60)
      doc.text(v.nombre,70,80)
      doc.setFontSize(9);
      let cabeza=['Nº','DESCRIPCION','CANTIDAD','PRECIO','SUB TOTAL']
      autoTable(doc,{columns:cabeza,bodyStyles:{fontSize:8},body:datos,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[100,100,100],textColor:[255,255,255],fontSize:7},startY:100})
      // addFooters(doc);
    doc.save(titulo+'.pdf')    
    
  }
}
const addFooters = doc => {
  const pageCount = doc.internal.getNumberOfPages()
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
    doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
  }
}

