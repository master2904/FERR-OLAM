import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import autoTable, { Cell, Row } from 'jspdf-autotable'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { ProductoService } from 'src/app/services/Producto.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { TipoService } from 'src/app/services/tipo.service';
import { environment } from 'src/environments/environment.prod';
import { RegistrarComponent } from './registrar/registrar.component';
import { jsPDF } from "jspdf";
import { COLORS, color } from 'html2canvas/dist/types/css/types/color';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})  
export class InventarioComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  title = 'Producto';
  f_productos ={id:null,nombre:null,imagen:null}; 
  f_tipos ={id:null,id_producto:null,descripcion:null}; 
  productos =[];
  tipos =[];
  detalles=[];
  base=environment.base+'producto/imagen/';

  llenar_imagen(img){    
    return this.base+img;
  }
  constructor(private producto:ProductoService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private detalle:DetalleService,private tipo:TipoService) { 
  }
  ngOnInit(): void {
    this.producto.listar(0).subscribe((data:any)=>{
      this.productos=data;
      // console.log(this.productos);
    });
  }
  flat=false;
  flat2=false;
  alerta(d){
    return d.stock<=d.cantidad_minima ;
  }
  id_t:0;
  modificar(d,t,i,j){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={d,t};
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogo1 = this.dialog.open(RegistrarComponent, dialogConfig);
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        this.update(art.value,i,j)
        // this.toastr.success("")
      }
        // this.nuevo(art.value);
      else
        this.toastr.info('Operacion Cancelda');
      }
    );

  }
  mostrar_tipo(p){
    this.flat=true;
    this.flat2=false;
    this.id_t=p.id;
    this.producto.buscar(p.id).subscribe((data:any)=>{
      this.f_productos=data;
    });
    this.tipo.inventario(p.id).subscribe((data:any)=>{
      this.tipos=data[0];
      this.detalles=data[1];
      console.log(this.tipos)
      console.log(this.detalles)
    }); 
  }
  mostrar_detalle(t){
    this.flat2=true;
    this.f_tipos=t;
    this.detalle.listar(t.id).subscribe((data:any)=>{
      this.detalles=data;
      console.log(this.detalles)
    }); 
  }
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
  update(f,i,j){
    console.log(f)
    this.detalle.update(f.id,f).subscribe((data:any)=>{
      console.log(data)
      this.detalles[i][j]=data
      this.toastr.success("exito")
    })
  }
  pdf(){
    this.detalle.listar_ventas(1).subscribe((data:any)=>{
      // console.log(data)
      let x=data
      let datos=[]
      let c=0
      x.forEach(w => {
        let t=[]
        t.push(c++)
        t.push(w.descripcion)
        t.push(w.codigo)
        t.push(w.stock)
        t.push(w.cantidad_minima)
        t.push(w.precio_compra)
        t.push(w.precio_venta)
        datos.push(t)
      });
      let fecha=new Date();
      const titulo="inventario "+fecha;
      const doc = new jsPDF('p', 'pt', 'letter');
      const imagen= new Image();
      imagen.src="assets/images/logo.jpg";
      doc.addImage(imagen,"jpg",20,20,550,80);    
      doc.setFontSize(9);
      doc.setFont('helvetica','bold')
      doc.text("______________________________________________________________________________________________________________",20,105);
      doc.setFontSize(20);
      doc.text("INVENTARIO",240,140);
      doc.setFont('helvetica','normal')
      doc.setFontSize(9);
      let cabeza=['#','DESCRIPCION','CODIGO','STOCK','CANTIDAD MINIMA','PRECIO COMPRA','PRECIO VENTA']
      autoTable(doc,{columns:cabeza,bodyStyles:{fontSize:8},body:datos,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255],fontSize:7},startY:150,
      didDrawCell: (data) => {
        if (data.column.index == 3 && data.cell.section === 'body') {
          let x=data.row.index
          let y=data.column.index
          if(datos[x][y]<datos[x][y+1]){
            doc.setDrawColor("#ff0000");
            doc.setFillColor("#ff0000"); 
            doc.circle(data.cell.x+10+(data.cell.width/2) ,data.cell.y+10,3,'FD');
          }
          else{
            // doc.setTextColor("#ff0000")
            // doc.setDrawColor("#000000");
            // doc.setFillColor("#ffffff");
          }
          // =[255,0, 0]
          // else
            // data.cell.styles.textColor=[0,0, 0]
            // doc.setTextColor("#000000")

          // var td = data.cell.raw;
          // if(data[data.row.index]<=data[data.row.index+1])
          // console.log(datos[data.row.index][data.column.index]+"=> "+datos[data.row.index][data.column.index+1])
          // // var img=this.base+imagenes[data.row.index];
          // var dim = data.cell.height - data.cell.padding('vertical');
          // var textPos = data.cell.getTextPos();
          // doc.addImage(img, textPos.x,  textPos.y, dim, dim);
        }
      }    
    })
    doc.save(titulo+'.pdf')    
    })
  }
}
    // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
    // autoTable(doc,{columns:cabeza,bodyStyles: {minCellHeight: 65},body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180
    // ,didDrawCell: (data) => {
    //   if (data.column.index === 2 && data.cell.section === 'body') {
    //     var td = data.cell.raw;
    //     var img=this.base+imagenes[data.row.index];
    //     var dim = data.cell.height - data.cell.padding('vertical');
    //     var textPos = data.cell.getTextPos();
    //     doc.addImage(img, textPos.x,  textPos.y, dim, dim);
    //  }
     //este si funciona
      // data.row.height=50;
      // if (data.section === 'body' && data.column.index === 2) {
        // data.row.height=80;
        // data.cell.width=100;
        // console.log(data.cell.text)
          // imag=this.base+imagenes[data.row.index];
          // doc.addImage(imag, 'JPEG', data.settings.margin.left, 40, 25, 25);

          // imag=this.base+data.cell.text;
          // imag=this.base+'202185131519.jpg';
        // doc.addImage(imag,"jpeg",10,10,60,60);
        // var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
          // doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y -20, 65, 65)
        // }
      // }
    // })
    // addFooters(doc)
    // doc.save(titulo+'.pdf')
// }
// }

// const addFooters = doc => {
//   const pageCount = doc.internal.getNumberOfPages()
//   doc.setFont('helvetica', 'italic')
//   doc.setFontSize(8)
//   for (var i = 1; i <= pageCount; i++) {
//     doc.setPage(i)
//     doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
//     doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
//   }
// }