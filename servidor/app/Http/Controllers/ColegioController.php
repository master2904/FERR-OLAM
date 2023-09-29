<?php

namespace App\Http\Controllers;

use App\Models\Colegio;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use stdClass;
class ColegioController extends Controller
{
    public function rep_equipos($id){
        $colegios=DB::select('SELECT c.nombre,c.color from colegios c, equipos e, detalles de,categorias ca where c.codigo=e.id_colegio and e.id_categoria=ca.id and ca.id_concurso=:id and e.id=de.id_equipo GROUP BY c.nombre,c.color',['id'=>$id]);
        $consulta=DB::select('SELECT c.nombre as "colegio",c.color,e.nombre,count(de.id_equipo) as valor from colegios c, equipos e, detalles de,categorias ca where c.codigo=e.id_colegio and e.id_categoria=ca.id and ca.id_concurso=:id and e.id=de.id_equipo GROUP BY e.id,c.nombre,c.color,e.nombre',['id'=>$id]);
        $res=[];
        $k=0;
        foreach($colegios as $c){
            $dato=new stdClass();
            $dato->name=$c->nombre;
            $dato->color=$c->color;
            $ans=[];
            $i=0;
            foreach($consulta as $con){
                if($con->colegio==$c->nombre){
                    $i++;
                }
            }
            $dato->value=$i;
            $res[$k]=$dato;
            $k++;
        }
        return response()->json($res);
    }
    public function rep_ganadores($id){
        $consulta=DB::select('SELECT c.nombre as colegio,c.color, e.nombre, e.posicion, ca.titulo from colegios c, equipos e, categorias ca where (e.posicion=1 or e.posicion=2 or e.posicion=3)  and c.codigo=e.id_colegio and e.id_categoria=ca.id and ca.id_concurso=:id GROUP by c.nombre, c.color, e.nombre, e.posicion , ca.titulo order by ca.titulo, e.posicion',['id'=>$id]);
        return response()->json($consulta);
    }
    public function rep_concurso($id){
        $consulta=DB::select('SELECT c.color,c.nombre as "name",count(*) as value from colegios c, equipos e, categorias ca where c.codigo=e.id_colegio and e.id_categoria=ca.id and ca.id_concurso=:id GROUP by c.nombre,c.color',['id'=>$id]);
        return response()->json($consulta);
    }
    public function rep_categoria($id){
        
        $consulta=DB::select('SELECT c.color, c.nombre as "name",count(*) as value from colegios c, equipos e where c.codigo=e.id_colegio and e.id_categoria=:id GROUP by c.nombre,c.color',['id'=>$id]);
        return response()->json($consulta);
    }
    public function index()
    {
        $users = Colegio::select("*")->orderBy("codigo", "asc")->get();
        return response()->json($users,200);
    }
    public function lista()
    {
        $id=1;
        $consulta=DB::select('SELECT * from colegios WHERE codigo >:id order by codigo',['id'=> $id]);
        return response()->json($consulta,200);
    }
    public function store(Request $request)
    {      
        //  return response()->json($request);
        $request->validate([
            'nombre' => 'required',
            'color' => 'required',
        ]);
        Colegio::create($request->all());
        // $colegio=Colegio::get();
        return response()->json(Colegio::get());
    }

    public function show($id)
    {
        return response()->json(Colegio::find($id));
    }
    public function update(Request $request, $id)
    {
        $colegio=Colegio::find($id);
        if (!$colegio) 
            return response()->json("Este Colegio no existe",400);
        $colegio->update($request->all());
            return response()->json(Colegio::get());
    }

    public function destroy ($id)
    {
        Colegio::find($id)->delete();
        return response()->json(Colegio::get());
    }
    
}
