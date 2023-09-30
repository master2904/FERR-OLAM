import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {
  historial=[]
  total_compra=0
  total_venta=0
  constructor(
    public dialogRef: MatDialogRef<VerComponent>,@ Inject(MAT_DIALOG_DATA) public form) {
      this.historial=form      
      console.log(this.historial)
      this.historial.forEach(w=>{
        this.total_compra+=w.sub_total_compra
        this.total_venta+=w.sub_total_venta
      })
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }
}
