import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../usuario/formulario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'src/app/model/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.scss']
})
export class CrearProveedorComponent implements OnInit {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z ]{3,20}/;
  agregar:FormGroup;
  file:File=null;
  nombre_i:string=null;
  form:Formulario;
  public previsualizacion:string
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),

      nombre:new FormControl('',[Validators.required,Validators.minLength(3)]),//, Validators.pattern(this.letras)]),
      apellido:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(this.letras)]),
      empresa: new FormControl('',[Validators.required,Validators.minLength(4)]),
      celular: new FormControl('',[Validators.required]),
      observacion: new FormControl('',[]),
    });
  }
  get nombre(){return this.agregar.get('nombre'); }
  get apellido(){return this.agregar.get('apellido'); }
  get empresa(){return this.agregar.get('empresa'); }
  get celular(){return this.agregar.get('celular'); }
  get observacion(){return this.agregar.get('observacion'); }
  settear(){
    this.agregar.reset({nombre:'',apellido:'',celular:'',empresa:'',observacion:''});
  }
  get f(){
    return this.agregar.controls;
  }  
  constructor(
    public dialogRef: MatDialogRef<CrearProveedorComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Proveedor,private usuario:ProveedorService,private toastr:ToastrService) {
      this.agregar=this.createFormGroup();

    }
  ngOnInit(): void {
    this.settear()
  }
  nuevo(){
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.nombre.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
  error_apellido() {
    if (this.apellido.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.apellido.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.apellido.hasError('pattern') ? 'Solo se aceptan letras' : '';
  }
  error_empresa() {
    if (this.empresa.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.empresa.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.empresa.hasError('pattern') ? 'Solo se aceptan numeros y letras' : '';
  }
  error_celular() {
    if (this.celular.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_password() {
    if (this.observacion.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.observacion.hasError('minlength'))
      return 'Clave con minimo 8 caracteres';
  }
}
