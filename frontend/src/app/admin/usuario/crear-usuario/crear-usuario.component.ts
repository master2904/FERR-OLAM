import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Formulario } from '../formulario';
import { environment } from 'src/environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z ]{3,20}/;
  agregar:FormGroup;
  file:File=null;
  nombre_i:string=null;
  form:Formulario;
  base=environment.base+'usuario/imagen/';
  public previsualizacion:string
  llenar_imagen(img){    
    return this.base+img;
  }

  createFormGroup(){
    return new FormGroup({
      id:new FormControl(''),
      nombre:new FormControl('',[Validators.required,Validators.minLength(3)]),//, Validators.pattern(this.letras)]),
      apellido:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern(this.letras)]),
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      rol: new FormControl('',[Validators.required]),
      imagen: new FormControl('',[Validators.required]),
      img: new FormControl(''),
      // email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      created_at:new FormControl(''),
      updated_at:new FormControl('')
    });
  }
  get nombre(){return this.agregar.get('nombre'); }
  get apellido(){return this.agregar.get('apellido'); }
  get username(){return this.agregar.get('username'); }
  get rol(){return this.agregar.get('rol'); }
  get imagen(){return this.agregar.get('imagen'); }
  get email(){return this.agregar.get('email'); }
  get password(){return this.agregar.get('password'); }
  settear(){
    this.agregar.reset({nombre:'',apellido:'',username:'',imagen:'',rol:'',email:'',password:''});
  }
  get f(){
    return this.agregar.controls;
  }  
  constructor(
    public dialogRef: MatDialogRef<CrearUsuarioComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Formulario,private usuario:UsuarioService,private toastr:ToastrService,private sanitizer:DomSanitizer) {
      this.agregar=this.createFormGroup();

    }
  ngOnInit(): void {
    this.settear()
  }
  cargarImagen(event){
    this.file=<File>event.target.files[0]
    let e=this.file.name.split('.');
    let ext=e[e.length-1]
    let fecha=new Date();
    this.nombre_i=""+fecha.getFullYear()+(fecha.getMonth()+1)+(fecha.getDay()+1)+fecha.getHours()+fecha.getMinutes()+fecha.getSeconds();
    this.nombre_i=this.nombre_i+"."+ext;
    console.log(this.nombre_i);
    this.extraer64(this.file).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
      console.log(imagen)
    })
  }
  enviarImagen(){
    this.usuario.onUpload(this.file,this.nombre_i).subscribe(data=>{
    },
    error=>{
      console.log(<any>error);
    }); 
  }
  nuevo(){
    this.enviarImagen();
    this.agregar.controls['img'].setValue(this.nombre_i);
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
  error_username() {
    if (this.username.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.username.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.username.hasError('pattern') ? 'Solo se aceptan numeros y letras' : '';
  }
  error_rol() {
    if (this.rol.hasError('required')) {
      return 'Este campo es obligatorio';
    }
  }
  error_imagen() {
    if (this.imagen.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }
  error_email() {
    if (this.email.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.email.hasError('email'))
      return 'Ingrese un correo valido';
  }
  error_password() {
    if (this.password.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.password.hasError('minlength'))
      return 'Clave con minimo 8 caracteres';
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
