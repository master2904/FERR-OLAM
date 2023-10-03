import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  icon:string;
  level: number;
  isExpanded?: boolean;
  routerLink:string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  menuList:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    cerrar_sesion(){
      this.auth.logout();
      this.route.navigateByUrl('/home');
      this.toastr.warning('Finalizaste sesion','Atencion');
    }
    getrol(){
      try {
        const rol=localStorage.getItem('rol');
        if(rol==="1")
          return "Administrador";
        if(rol==="2")
          return "Ferreteria";
        if(rol==="3")
          return "Barraca";
      } 
      catch (error) {    
      }
        return "";
    }
    nombre(){
      return localStorage.getItem('nombre');
    }
    imagen(){
      return localStorage.getItem('imagen');
    }
  constructor(private breakpointObserver: BreakpointObserver,private auth: AuthService , private toastr:ToastrService, private route:Router) {}
  ngOnInit(): void {
    
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);



hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}