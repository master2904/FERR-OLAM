import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-reporte-producto-mes',
  templateUrl: './reporte-producto-mes.component.html',
  styleUrls: ['./reporte-producto-mes.component.scss']
})
export class ReporteProductoMesComponent implements OnInit {
  pie=0;
  fecha:Date
  anio=[]
  meses=[
    {id:1,valor:'ENERO'},
    {id:2,valor:'FEBRERO'},
    {id:3,valor:'MARZO'},
    {id:4,valor:'ABRIL'},
    {id:5,valor:'MAYO'},
    {id:6,valor:'JUNIO'},
    {id:7,valor:'JULIO'},
    {id:8,valor:'AGOSTO'},
    {id:9,valor:'SEPTIEMBRE'},
    {id:10,valor:'OCTUBRE'},
    {id:11,valor:'NOVIEMBRE'},
    {id:12,valor:'DICIEMBRE'}]
  mostrar=false;
  // single: any[];
  view: any[] = [900, 300];
  single = [];
  categorias=[];
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

  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
concursos=[];
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
  constructor(private venta:VentaService) { }
  fechar(c){
    this.pie=2;
    this.categorias=[];
    this.colores=[];
    this.view = [700, 300];
        this.venta.r_meses(c).subscribe((data:any)=>{
          this.single=[];
          // this.colorScheme.domain=[]
          console.log(data)
          data.forEach(valor => {
            let x={"name":valor.nombre,"value":valor.valor}
            this.single.push(x);
            // this.colorScheme.domain.push('#ffffff');
          });
          this.categorias.push(this.single);
          // this.colores.push(this.colorScheme);
          // console.log(this.categorias)
        });        
  }
  listar(c){
    this.mostrar=true;
    this.fcon=c;
    this.pie=0;
  }
  ngOnInit(): void {
    let i=2010
    while(i<2025){
      this.anio.push(i++)
    }
  }
  
}
