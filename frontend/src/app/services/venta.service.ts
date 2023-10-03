import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  base=environment.base;
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}venta`);
  }
  r_meses(c){
    return this.http.get(`${this.base}venta/meses/`+c);
  }
  fecha(fecha,l){
    return this.http.get(`${this.base}venta/fecha/`+l+`/`+fecha);
  }

  listar_fecha(id){
    return this.http.get(`${this.base}venta/historial/`+id);
  }
  buscar(id){
    return this.http.get(`${this.base}venta/`+id);
  }
  nuevo(form){
    // console.log(form);
    return this.http.post(`${this.base}venta`,form);
  }
  eliminar(id){
    console.log(id);
    return this.http.delete(`${this.base}venta/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}venta/`+id, form);
  }  
}
