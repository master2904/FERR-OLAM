import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @Input() dataEntrante:any;
  createFormGroup(){
    return new FormGroup({
      id:new FormControl(""),
      nit: new FormControl(""),
      nombre: new FormControl("")
    });
  }
  nuevo:FormGroup;
  filtroCliente: Observable<Cliente[]>;
  filtro_clientes: any[] = [];
  ventas =[];
  detalles=[];
  clientes=[];
  matriz=[]
  flat=false;
  flat2=false;
  hide=true
  f_productos ={id:null,nombre:null,imagen:null}; 
  f_tipos ={id:null,id_producto:null,descripcion:null}; 
  get nombre(){return this.nuevo.get('nombre'); }
  get nit(){return this.nuevo.get('nit'); }
  get producto(){return this.nuevo.get('producto'); }
  get cantidad(){return this.nuevo.get('cantidad'); }
  get precio(){return this.nuevo.get('precio'); }
  get id_detalle(){return this.nuevo.get('id_detalle'); }
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(option => (option.nit).toLowerCase().includes(filterValue));
  }
  constructor(private cliente:ClienteService) { 
  }
  
  cargar(){
    this.filtroCliente = this.nit.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.cliente.listar().subscribe((data:Cliente[])=>{
      this.clientes=data;
      this.filtro_clientes = this.clientes.map(w => {
        return {id:w.id,nit:w.nit,nombre:w.nombre}
      })
    })
  }
  error_nit(){
    if(this.nit.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  error_nombre(){
    if(this.nombre.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  setear_cliente(s){
    this.nuevo.controls['nombre'].setValue(s.nombre);
    this.nuevo.controls['nit'].setValue(s.nit);
    this.form.id_cliente=s.id;
    this.form.nit=s.nit;
    this.form.nombre=s.nombre;
    localStorage.setItem('n1',this.form.nit)
    localStorage.setItem('n2',this.form.nombre)
    localStorage.setItem('n3',this.form.id_cliente)
    // this.dataEntrante=this.formÇ
    // this.cliente.disparador.emit({data:this.dataEntrante})
    // console.log(this.form)
  }
  letra=""
  nuevo_nit(e){
    if(this.form.nombre==null){
      this.letra+=e
      this.nuevo.controls['nit'].setValue(e)
      // this.form.nombre="";
      this.form.nit=e;
      this.form.id_cliente=0;
      // console.log(this.form)
      // console.log(this.form)
    }
  }
  form={nombre:null,id_cliente:null,nit:null}
  nuevo_nombre(e){
    this.nuevo.controls['nombre'].setValue(e)
    this.form.nombre=e;
    this.form.id_cliente=0;
    this.dataEntrante=this.form
    // this.cliente.disparador.emit({data:this.dataEntrante})
    localStorage.setItem('n1',this.form.nit)
    localStorage.setItem('n2',this.form.nombre)
    localStorage.setItem('n3',this.form.id_cliente)
    // console.log(this.dataEntrante)
}

  ngOnInit(): void {
    this.nuevo=this.createFormGroup();
    this.cargar();
  }
}
