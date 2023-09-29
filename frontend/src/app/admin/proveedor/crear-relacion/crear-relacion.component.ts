import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Producto } from 'src/app/model/producto';
import { DetalleService } from 'src/app/services/detalle.service';

@Component({
  selector: 'app-crear-relacion',
  templateUrl: './crear-relacion.component.html',
  styleUrls: ['./crear-relacion.component.scss']
})
export class CrearRelacionComponent implements OnInit {
  detalles=[]
  constructor(  public dialogRef: MatDialogRef<CrearRelacionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data,private detalle:DetalleService){}
  ngOnInit(): void {
    this.agregar=this.createFormGroup()    
    this.cargar()
    console.log(this.data)  
  }
  createFormGroup(){
    return new FormGroup({
      id:new FormControl('',[Validators.required]),
      producto:new FormControl('',[Validators.required]),
    });
  }
  
  agregar:FormGroup
  get producto(){return this.agregar.get('producto'); }
  get id(){return this.agregar.get('id'); }
  filtroProducto: Observable<any[]>;
  filtro_productos: any[] = [];
  private _filter_producto(value: string): Producto[] {
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
        // console.log(w)
        return {w};
        // id:w.id,descripcion:w.descripcion,codigo:w.codigo,value:w.id,stock:w.stock,precio:w.precio_venta};
      })
    });
  }
  onenter(){
    console.log('presionaste enter')
    console.log(this.agregar.controls['producto'].value)
  }
  setear_producto(option){
    console.log(option)
  }
}
