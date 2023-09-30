import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(id){
    // console.log(id);
    return this.http.get(`${this.base}relacion/lista/`+id);
  }
  nuevo(form){
    return this.http.post(`${this.base}relacion`,form);
  }
  remove(id){
    return this.http.delete(`${this.base}relacion/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}relacion/`+id, form);    
  }
}
