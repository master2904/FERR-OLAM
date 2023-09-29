<?php

namespace App\Http\Controllers;

use App\Models\Maquina;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class MaquinaController extends Controller
{
    public function index()    {
        return response()->json(Maquina::all()->sortBy('numero'),200);    
    }

    public function buscar($id)
    {
        $maquina= DB::Table('maquinas')->where('id_labo',$id)->get()->sortBy('numero');
        // $maquina = Maquina::where("id_labo",$id)->get;    
        return response()->json($maquina);
    }
    public function generar(Request $request )
    {        
        // $numero=1;
        // $estado=0;
        // for ($i=1; $i <=$n; $i++) { 
        //     Maquina::create([
        //         'id_labo'=>$id,
        //         'numero'=>$i,
        //         'estado'=>0
        //     ]);    
        // }
        // return response()->json(DB::Table('maquinas')->where('id_labo',$id)->get()->sortBy('numero'));
        return response()->json($request);
    }
    public function inhabilitados($id_cat,$id_lab){
        $consulta=DB::select('SELECT m.id,m.id_concurso,m.id_laboratorio,m.id_equipo,m.estado,m.numero,c.color,e.nombre,c.nombre as colegio, c.codigo as id_colegio FROM maquinas m, colegios c, equipos e WHERE m.id_concurso=:id and m.id_laboratorio=:id_lab and m.id_equipo=e.id and e.id_colegio=c.codigo order by m.numero',['id'=> $id_cat,'id_lab'=> $id_lab]);
        $laboratorio=DB::select('SELECT maquinas FROM laboratorios WHERE id=:id',['id'=> $id_lab]);
        $data=[];
        $m=$laboratorio[0]->maquinas;
        for($i=1;$i<=$m;$i++){
            $objeto=new stdClass();
            $objeto->id=0;
            $objeto->id_concurso=$id_cat;
            $objeto->id_laboratorio=$id_lab;
            $objeto->id_equipo=0;
            $objeto->estado=0;
            $objeto->numero=$i;
            $objeto->id_colegio=0;
            $objeto->color="#ffffff";
            $objeto->nombre="vacio";
            $objeto->colegio="vacio";
            $data[$i]=$objeto;
        }
        // return response()->json($consulta);
        foreach($consulta as $c){
            $data[$c->numero]=$c;
        }
        return response()->json($data);
    }
    public function baja(Request $request){
        Maquina::create($request->all());
        return $this->inhabilitados($request->id_concurso,$request->id_laboratorio);
        return response()->json($request);
    }
    public function rango(Request $request){
        try {
            $i=0;
            while($request[$i]!=null){
                $v=$request[$i];
                $ans=new Maquina;
                $ans->id_concurso=$v['id_concurso'];
                $ans->id_laboratorio=$v['id_laboratorio'];
                $ans->id_equipo=$v['id_equipo'];
                $ans->estado=$v['estado'];
                $ans->numero=$v['numero'];
                $ans->save();
                // return response()->json($ans);
                // Maquina::create($ans);
                $i++;
            }
        }
        catch (\Exception $exception) {
            return response()->json(['error' => ''], 400);
        }        
        return  response()->json(['status' => 'ok']);
        // return $this->inhabilitados($request->id_concurso,$request->id_laboratorio);
        // return response()->json($request);
    }
    public function alta($id){
        $maquina=Maquina::find($id);
        $maquina->delete();
        return $this->inhabilitados($maquina->id_concurso,$maquina->id_laboratorio);
    }
    public function show($id)
    {
        return response()->json(Maquina::find($id));
    }
    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $maquina=Maquina::find($id);
        if (!$maquina) 
            return response()->json("Este maquina no existe",400);
        $maquina->update($request->all());
            return response()->json(array('success'=>'maquina Actualizada'));
    }

    public function destroy ($id)
    {
        DB::table('maquinas')->where('id_labo','=',$id)->delete();
        // Maquina::find($id)->delete();
        return response()->json(DB::Table('maquinas')->where('id_labo',$id)->get()->sortBy('numero'));
    }

}
