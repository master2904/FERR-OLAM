import { Component, Inject, OnInit, Sanitizer } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { ProductoService } from 'src/app/services/Producto.service';
import { Formulario } from '../formulario';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  numero:any=/[0-9]+/;
  letras:any=/[A-Za-z ]{3,30}/;
  file:File=null;
  nombre1=null;
  public previsualizacion:string
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(this.letras)]),
      imagen: new FormControl('',Validators.required),
      img: new FormControl(''),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  agregar:FormGroup;
  get nombre(){return this.agregar.get('nombre'); }
  get imagen(){return this.agregar.get('imagen'); }
  get f(){
    return this.agregar.controls;
  }
  settear(){
    this.agregar.reset({nombre:'',maquinas:'',columnas:'',jefe_labo:'',imagen:''});
  }
  cargarImagen(event){
    this.file=<File>event.target.files[0]
    let e=this.file.name.split('.');
    let ext=e[e.length-1]
    let fecha=new Date();
    this.nombre1=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    this.nombre1=this.nombre1+"."+ext;
    console.log(this.nombre1);
    this.extraer64(this.file).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
      console.log(imagen)
    })
  }
  enviarImagen(){
    this.labo.onUpload(this.file,this.nombre1).subscribe(data=>{
      console.log(data);
    },
    error=>{
      console.log(<any>error);
    }); 
  }
  constructor(
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private labo:ProductoService, private sanitizer:DomSanitizer) {
    this.agregar=this.createFormGroup();
  }
  nuevo(){
    this.enviarImagen();
    this.agregar.controls['img'].setValue(this.nombre1);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nombre() {
    if (this.nombre.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre.hasError('minlength'))
      return 'Ingrese minimo 6 caracteres';
    return this.nombre.hasError('pattern') ? 'Ingrese letras y/o numeros' : '';
  }

  error_imagen() {
    if (this.imagen.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }
  ngOnInit(): void {
  }
  extraer64 = async ($event:any) => new Promise((resolve,reject) => {
    try{
      const unsafeImg=window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve(
        {base:reader.result}
        )
      };
      reader.onerror=error=>{
        base:null
      }
    }
    catch(e){
      return null
    }
  })  
}
