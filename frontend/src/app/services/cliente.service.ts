import { HttpClient } from '@angular/common/http';
import { EventEmitter,Injectable,Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // @Output() usuario: EventEmitter<any>= new EventEmitter();

  @Output() disparador:EventEmitter<any> = new EventEmitter();
  base=environment.base;
  constructor(private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}cliente/`);
  }
  buscar(id){
    return this.http.get(`${this.base}cliente/`+id);
  }
  nuevo(form){
    return this.http.post(`${this.base}cliente`,form);
  }
  remove(id){
    return this.http.delete(`${this.base}cliente/`+id);
  }
  update(id,form) {
    return this.http.put(`${this.base}cliente/`+id, form);    
  }

}