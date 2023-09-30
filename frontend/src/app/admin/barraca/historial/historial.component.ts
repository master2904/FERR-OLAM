import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentaService } from 'src/app/services/venta.service';
import { VerComponent } from './ver/ver.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  ventas=[];
  constructor(private venta:VentaService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.venta.listar_fecha(1).subscribe((data:any)=>{
      this.ventas=data    
    })
  }
  total(ventas){
    this.total_compra=0
    this.total_venta=0
    ventas.forEach(w=>{
      this.total_compra= this.total_compra+w.total_compra
      this.total_venta= this.total_venta+w.total_venta
      // console.log(w.sub_total)
    })
    this.utilidad=this.total_venta-this.total_compra
  }
  historial=[]
  transacciones=[]
  total_venta=0
  total_compra=0
  utilidad=0
  setear(fecha){
    let form={fecha:null}
    let nombre=""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate());
    form.fecha=nombre;
    this.venta.fecha(nombre).subscribe((data:any)=>{
      // console.log(data)
      this.historial=data[0];
      this.transacciones=data[1];
      this.total(this.historial)
    })
  }
  ver(i) {
    const dialogo1 = this.dialog.open(VerComponent, {data:this.transacciones[i]});
  }

}
