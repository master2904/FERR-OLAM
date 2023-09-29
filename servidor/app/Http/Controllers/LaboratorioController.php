<?php

namespace App\Http\Controllers;

use App\Models\Laboratorio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LaboratorioController extends Controller{
    public function index(){
        return response()->json(Laboratorio::get(),200);    
    }

    public function create(){
    }
    public function store(Request $request){        
        $request->validate([
            'aula'=>'required',
            'jefe_labo'=>'required',
            'maquinas'=>'required'
        ]);
        Laboratorio::create($request->all());
        return response()->json(Laboratorio::get(),200);
        // return response()->json($request);
    }
    public function imageUpload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);
        // $imageName = time().'.'.$request->image->extension();  
        // $imageName = $request->image->name();
        // $imageName =$request->image->getClientOriginalName().'.'.$request->image->extension(); 
        // $request->image->move(public_path('images'), $imageName);
        $imagen=$request->file('image');
        $path_img='laboratorio';
        $imageName = $path_img . '/' . $imagen->getClientOriginalName();
        try {
            Storage::disk('public')->put($imageName, File::get($imagen));
        }
        catch (\Exception $exception) {
            return response('error',400);
        }
        return response()->json(['image' => $imageName]);
    }
    public function show($id){
        return response()->json(Laboratorio::find($id));
    }
    public function edit($id){
    }
    public function update( $id,Request $request){
        $equipo=Laboratorio::find($id);
        // return response()->json($equipo);
        $input=$request->all();
        if($input['imagen']=="")
            $input['imagen']=$equipo->imagen;
        $equipo->update($input);
        return response()->json(Laboratorio::get(),200);
    }
    public function destroy ($id){
        Laboratorio::find($id)->delete();
        return response()->json(Laboratorio::get(),200);
    }
    public function image($nombre){
        return response()->download(public_path('storage').'/laboratorio/'.$nombre,$nombre);
    }
    
}