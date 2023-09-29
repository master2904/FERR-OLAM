import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}proveedor`);
  }
  buscar(id){
    return this.http.get(`${this.base}proveedor/`+id);
  }
  nuevo(form){
    return this.http.post(`${this.base}proveedor`,form);
  }
  remove(id){
    return this.http.delete(`${this.base}proveedor/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}proveedor/`+id, form);    
  }
}
