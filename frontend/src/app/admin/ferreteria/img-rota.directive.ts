import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appImgRota]'
})
export class ImgRotaDirective {

  constructor(private element:ElementRef) { }
  @HostListener('error')
  cargarImagenPorDefecto(){
    const img=this.element.nativeElement
    img.src="assets/images/default.png"
  }
}
