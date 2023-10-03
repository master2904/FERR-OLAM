import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import {Colores} from 'src/app/colores'
import { color } from 'html2canvas/dist/types/css/types/color';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-reporte-producto-mes',
  templateUrl: './reporte-producto-mes.component.html',
  styleUrls: ['./reporte-producto-mes.component.scss']
})
export class ReporteProductoMesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  categorias=[];
  meses=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
  dataSource: MatTableDataSource<any>
  pie=0;
  fecha:Date
  anio=[]
  mostrar=false;
  // single: any[];
  view: any[] = [700, 300];
  single = [];
  colores=[];
  cate=[];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Colegios';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  
concursos=[];
colo:Colores = new Colores()
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  fcon=null;
  constructor(private venta:VentaService,private changeDetectorRef: ChangeDetectorRef) { }
  fechar(c){
    this.mostrar=true
    this.pie=2;
    this.categorias=[];
    this.colores=[];
    this.view = [900,300];
    this.venta.r_meses(c).subscribe((data:any)=>{
      let t=0
      data.forEach(fila => {
        let colorScheme = {
          domain: []
        };
        // this.colorScheme.domain=[]
        this.single=[];
        let i = 0
          let val=fila
          console.log(val)
          val.forEach(value=>{
            let x={"name":value.nombre,"value":value.valor}
            this.single.push(x);
            colorScheme.domain.push(this.colo.get(i));
            i++
          });
        // this.colores.push(colorScheme);
        let y={'valor':this.single,'color':colorScheme,'mes':this.meses[t]}
        t++
        this.categorias.push(y);
        // this.categorias.push(this.single);
      });
      console.log(this.categorias)
      console.log(this.colores)
      this.dataSource= new MatTableDataSource<any>(this.categorias);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });        
  }
  ngOnInit(): void {
    let i=2020
    while(i<2025){
      this.anio.push(i++)
    }
    
  }
  
}
