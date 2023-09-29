<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::select("*")->orderBy("nombre", "asc")->get();
        return response()->json($product,200);
    }
    public function listado($id)
    {
        $product=Product::where('lugar',$id)->orderBy("nombre","asc")->get();
        
        // $product = Product::select("*")->orderBy("nombre", "asc")->where("detalle",0)->get();
        return response()->json($product,200);
    }

    public function store(Request $request)
    {
        // return response()->json($request["lugar"]);
        $lugar=$request['lugar'];
        $request->validate([
            'nombre' => 'required',
            'imagen' => 'required',
        ]);
        Product::create($request->all());
        return $this->listado($lugar);
    }

    public function show($id)
    {
        return response()->json(Product::find($id));
    }
    public function update(Request $request, $id)
    {
        $producto=Product::find($id);
        $lugar=$request['lugar'];
        if (!$producto) 
            return response()->json("Este Producto no existe",400);
        $producto->update($request->all());
        return $this->listado($lugar);
    }

    public function destroy($id)
    {
        $p=Product::find($id);
        $lugar=$p['lugar'];
        $p->delete();
        return $this->listado($lugar);
    }
    public function imageUpload(Request $request){
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);
        $imagen=$request->file('image');
        $path_img='producto';
        $imageName = $path_img.'/'.$imagen->getClientOriginalName();
        try {
            Storage::disk('public')->put($imageName, File::get($imagen));
        }
        catch (\Exception $exception) {
            return response('error',400);
        }
        return response()->json(['image' => $imageName]);
    }

    public function image($nombre){
        return response()->download(public_path('storage').'/producto/'.$nombre,$nombre);
    }

}


