import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Formulario } from '../formulario';
import { DetalleService } from 'src/app/services/detalle.service';

@Component({
  selector: 'app-editar-detalle',
  templateUrl: './editar-detalle.component.html',
  styleUrls: ['./editar-detalle.component.scss']
})
export class EditarDetalleComponent implements OnInit {

  numero:any=/[0-9]+/;
  letras:any=/[A-Za-z ]{3,30}/;
  file:File=null;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      codigo:new FormControl('',[Validators.required,Validators.min(1),Validators.max(9999)]),
      id_tipo: new FormControl(''),
      descripcion: new FormControl('',Validators.required),
      cantidad_minima: new FormControl('',[Validators.required,Validators.min(1),Validators.max(9999)]),
      precio_compra: new FormControl('',[Validators.required,Validators.min(0),Validators.max(9999)]),
      precio_venta: new FormControl('',[Validators.required,Validators.min(0),Validators.max(9999)]),
      stock: new FormControl('',[Validators.required,Validators.min(1),Validators.max(9999)]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get codigo(){return this.agregar.get('codigo');}
  get id_tipo(){return this.agregar.get('id_tipo');}
  get descripcion(){return this.agregar.get('descripcion');}
  get cantidad_minima(){return this.agregar.get('cantidad_minima');}
  get precio_compra(){return this.agregar.get('precio_compra');}
  get precio_venta(){return this.agregar.get('precio_venta');}
  get stock(){return this.agregar.get('stock');}
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({id:'',codigo:'', id_tipo:'', descripcion:'', cantidad_minima:'', precio_compra:'', precio_venta:'', stock:''});
  }
  constructor(
    public dialogRef: MatDialogRef<EditarDetalleComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private labo:DetalleService) {
    this.agregar=this.createFormGroup();
    this.agregar.controls['id'].setValue(data.id);
    this.agregar.controls['id_tipo'].setValue(data.id_tipo);
    this.agregar.controls['codigo'].setValue(data.codigo);
    this.agregar.controls['descripcion'].setValue(data.descripcion);
    this.agregar.controls['cantidad_minima'].setValue(data.cantidad_minima);
    this.agregar.controls['precio_compra'].setValue(data.precio_compra);
    this.agregar.controls['precio_venta'].setValue(data.precio_venta);
    this.agregar.controls['stock'].setValue(data.stock);

  }
  nuevo(){
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_codigo() {
    if (this.codigo.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.codigo.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.codigo.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_descripcion() {
    if (this.descripcion.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.descripcion.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.descripcion.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_cantidad_minima() {
    if (this.cantidad_minima.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.cantidad_minima.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.cantidad_minima.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_precio_compra() {
    if (this.precio_compra.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_compra.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.precio_compra.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_precio_venta() {
    if (this.precio_venta.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_venta.hasError('max'))
      return 'Numero maximo aceptado: 400';
    return this.precio_venta.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  error_stock() {
    if (this.stock.hasError('required')) {
      return 'Este campo es obligatorio';
    }
// ç    if(this.stock.hasError('max'))
      // return 'Numero maximo aceptado: 400';
    return this.stock.hasError('min') ? 'Solo se aceptan numeros positivos' : '';
  }
  ngOnInit(): void {
  }
}
