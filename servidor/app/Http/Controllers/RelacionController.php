<?php

namespace App\Http\Controllers;

use App\Models\relacion;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RelacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(relacion::get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
    public function lista($id){
        $p=Vendor::find($id);
        $ans=[];
        $consulta=DB::select('SELECT r.id,r.id_detalle,d.codigo,concat(p.nombre," ",t.descripcion ," ", d.descripcion) as descripcion FROM products p,tipos t,detalles d,relacions r, vendors v WHERE t.id_producto=p.id and d.id_tipo=t.id and d.id=r.id_detalle and r.id_vendor=v.id and v.id=:id',['id'=>$p->id]);
        array_push($ans,$consulta);
        return response()->json($ans);    

        $consulta= relacion::where('id_vendor',$id)->get();
        // DB::select('select * from relacions');
        return response()->json($consulta);
    }
    public function store(Request $request)
    {
        // $form=$request->datos;
        $id=$request->id_vendor;
        // $r = new Request(array('id' =>0,'id_vendor'=>$form['id_vendor'],'id_detalle'=>$form['id_detalle']));
        relacion::create($request->all());
        return $this->lista($id);
        // return $this->index();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\relacion  $relacion
     * @return \Illuminate\Http\Response
     */
    public function show(relacion $relacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\relacion  $relacion
     * @return \Illuminate\Http\Response
     */
    public function edit(relacion $relacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\relacion  $relacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, relacion $relacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\relacion  $relacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(relacion $relacion)
    {
        //
    }
}
