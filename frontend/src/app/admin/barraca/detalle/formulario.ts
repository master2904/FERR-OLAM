export class Formulario {
    constructor(
        public id:number,
        public codigo:number,
        public id_tipo:number,
        public descripcion:string,
        public cantidad_minima:number,
        public precio_compra:number,
        public precio_venta:number,
        public stock:number,
       public id_vendor:number 
    ){}
}
