<?php

namespace App\Http\Controllers;

use App\Models\Problema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProblemaController extends Controller
{
    public function index()    {
        return response()->json(Problema::get(),200);    
    }

    public function store(Request $request)
    {        
        $request->validate([
            'titulo'=>'required',
        ]);
        Problema::create($request->all());
        // $lista=Problema::select(['id','alias','dificultad','autor','color'])->where('id_categoria',$request->input('id_categoria'))->orderby('alias')->get();
        return $this->buscar($request->input('id_categoria'));

        // $lista=Problema::where('id_categoria',$request->input('id_categoria'))->get();
        // return response()->json($lista,201);
    }

    public function show($id)
    {
        return response()->json(Problema::find($id));
    }

    public function update(Request $request, $id)
    {
        $problema=Problema::find($id);
        if (!$problema) 
            return response()->json("Este problema no existe",400);
        $problema->update($request->all());
        return $this->buscar($request->input('id_categoria'));
        // $lista=Problema::where('id_categoria',$request->input('id_categoria'))->get();
        // return response()->json($lista,201);
    }

    public function eliminar ($id,$id_cat)
    {
        Problema::find($id)->delete();
        // return response()->json(array('success'=>'Problema Eliminado'));
        $lista=Problema::where('id_categoria',$id_cat)->get();
        return response()->json($lista,201);        
    }
    public function buscar($id)
    {
        
        $lista=Problema::select(['id','titulo','alias','dificultad','autor','color','id_categoria'])->where('id_categoria',$id)->orderby('alias')->get();
        // $lista=Problema::where('id_categoria',$id)->get();
        return response()->json($lista,201);
        // $maquina= DB::Table('problemas')->where('id_categoria',$id)->get()->sortBy('titulo');
            // // $maquina = Maquina::where("id_labo",$id)->get;    
        // return response()->json($maquina);
    }
}
