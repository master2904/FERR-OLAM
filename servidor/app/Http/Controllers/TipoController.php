<?php

namespace App\Http\Controllers;

use App\Models\Tipo;
use App\Models\Detalle;
use App\Models\Product;
use Illuminate\Http\Request;

class TipoController extends Controller
{
    public function index()
    {
        $lista=Tipo::get();
        return response()->json($lista,200);
        
    }
    public function listar($id){
        $lista=Tipo::where('id_producto',$id)->get();
        return response()->json($lista);
    }
    public function inventario($id){
        $producto=Tipo::where('id_producto',$id)->get();
        $i=0;
        $lista=[];
        while(isset($producto[$i])){
            $ans=$producto[$i];
            $lista[$i]=Detalle::where('id_tipo',$ans->id)->get();
            $i=$i+1;
        }
        return response()->json(array($producto,$lista));
    }
    public function imprimir($lugar){
        $p=Product::where('lugar',$lugar)->get();
        $i=0;
        $answer=[];
        $c=0;
        while(isset($p[$i])){
            $tipo=Tipo::where('id_producto',$p[$i]->id)->get();
            $j=0;
            $lista=[];
            $temp=[];
            while(isset($tipo[$j])){
                $ans=$tipo[$j];
                $lista=Detalle::where('id_tipo',$ans->id)->get();
                $temp=array($tipo[$j],$lista);
                $j=$j+1;
                // array_push($temp,$lista);
            }
            $temp=array($p[$i],$temp);
            array_push($answer,$temp);
            $i=$i+1;
        }
        return response()->json($answer);
    }
    public function store(Request $request)
    {
        $id_producto=$request['id_producto'];
        Tipo::create($request->all());
        return $this->listar($id_producto);
    }
    
    public function show($id)
    {
        return response()->json(Tipo::find($id));
    }
    public function update(Request $request, $id)
    {
        $tipo=Tipo::find($id);
        if (!$tipo) 
            return response()->json("Esta Categoria no existe",400);
        $tipo->update($request->all());
        return $this->listar($request->input('id_producto'));
    }
    public function eliminar ($id,$id_p)
    {
        Tipo::find($id)->delete();
        return $this->listar($id_p);
    }
    
    // public function delete($id)
    public function destroy($id)
    {
        $lista = Tipo::find($id);
        // return response()->json($lista);
        $valor=$lista->id_producto;
        $lista->delete();
        return $this->listar($valor);
    }   
}
