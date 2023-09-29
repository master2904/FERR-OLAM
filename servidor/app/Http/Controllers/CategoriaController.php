<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriaController extends Controller
{
    public function index()    {
        return response()->json(Categoria::get(),200);    
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);
        Categoria::create($request->all());
        $lista=Categoria::where('id_concurso',$request->input('id_concurso'))->get();
        return response()->json($lista,200);
    }

    public function show($id)
    {
        return response()->json(Categoria::find($id));
    }
    public function buscar($id)
    {
        $lista=Categoria::where('id_concurso',$id)->get();
        return response()->json($lista);
    }
    // public function mayorid($id){
    //     // $maximo=DB::select('SELECT id,titulo fROM categorias where id=');
    //     // $lista=Categoria::where('id_concurso',$id);
    //     // $maximo=DB::select('SELECT max(id) as "maximo" FROM categorias');
    //     $lista=DB::select('SELECT id,titulo FROM categorias WHERE id_concurso=:id',['id'=> $id]);
    //     return response()->json($lista);
    // }
    public function update($id, Request $request)
    {
        $categoria=Categoria::find($id);
            if (!$categoria) 
            return response()->json("La categoria no existe",400);
        $categoria->update($request->all());
        $lista=Categoria::where('id_concurso',$request->input('id_concurso'))->get();
        return response()->json($lista,200);
    }

    public function destroy ($id){
        $categoria=Categoria::find($id);
        $categoria->delete();
        $lista=Categoria::where('id_concurso',$categoria->id_concurso)->get();
        return response()->json($lista,200);
    }
}
