<?php

namespace App\Http\Controllers;

use App\Imports\EquiposImport;
use App\Models\Categoria;
use App\Models\Concurso;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical\Size;
use stdClass;

class EquipoController extends Controller
{   
    public function index()    {
        return response()->json(Equipo::paginate(5));    
    }

    public function store(Request $request)
    {
        $request->validate([           
            'nombre'=>'required',
            'id_colegio'=>'required',
            'id_categoria'=>'required'
        ]);
        Equipo::create($request->all());
        return $this->buscar($request->input('id_categoria'));
        // $lista=Equipo::where('id_categoria',$request->input('id_categoria'))->get();
        // return response()->json($lista,201);
    }

    public function show($id)
    {
        $equipo=Equipo::find($id);
        $id1=$equipo->id_categoria;
        $c=Categoria::find($id1);
        $res=new stdClass();
        $res->id=$equipo->id;
        $res->nombre=$equipo->nombre;
        $res->cuenta=$equipo->cuenta;
        $res->clave=$equipo->clave;
        $res->titulo=$c->titulo;
        $res->descripcion=$c->descripcion;
        return response()->json($res);
    }
    public function update(Request $request, $id)
    {
        $problema=Equipo::find($id);
        if (!$problema) 
            return response()->json("Este equipo no existe",400);
        $problema->update($request->all());
        // $lista=Equipo::where('id_categoria',$request->input('id_categoria'))->get();
        // return response()->json($lista,201);
        return $this->buscar($request->input('id_categoria'));

    }
    public function rango(Request $request, $id)
    {
        // return response()->json($request);
        $i=0;
        $valor=null;       
        $valor1=null;       
        while($request[$i]!=null) {
            $valor=$request[$i];
            $valor1[$i]=$request[$i];
            $e=Equipo::find($valor['id']);
            $e['nombre']=$valor['nombre'];
            $e['id_colegio']=$valor['id_colegio'];
            $e['cuenta']=$valor['cuenta'];
            $e['clave']=$valor['clave'];
            $e['id_categoria']=$valor['id_categoria'];
            $e->save();
            $i=$i+1;
        }
        return $this->listar_concurso($id);
        $listas=Categoria::where('id_concurso',$id)->get();
        $equipo=null;
        $i=0;
        foreach($listas as $lista){
            $e=Equipo::where('id_categoria',$lista['id'])->get();
            $equipo[$i]=$e;
            // $equipo[$i]=Equipo::where('id_categoria',$lista['id'])->get();
            $i++;
        }
        $i=0;
        $lista=null;
        foreach ($equipo as $eq) {
            foreach($eq as $e){
                $lista[$i]=$e;
                $i++;
            }
        }
        // $equipos=Equipo::where('id_categoria',$lista['$id'])->get();
        return response()->json($lista);
        // return response()->json($request);
    }
    public function eliminar ($id,$id_cat)
    {   
        Equipo::find($id)->delete();
        // $lista=Equipo::where('id_categoria',$id_cat)->get();
        // return response()->json($lista,201);        
        return $this->buscar($id_cat);
    }
    public function buscar($id)
    {
        // $lista=Equipo::where('id_categoria',$id)->get();
        $lista=DB::select('SELECT e.id,e.nombre,e.cuenta,e.clave,c.nombre as "colegio" FROM equipos e, colegios c WHERE e.id_colegio=c.codigo and e.id_categoria=:id',['id'=> $id]);
        return response()->json($lista,201);
//$sele = marca::distinct()->select('marca.COD_MARCA','marca.NOMBRE_MARCA')->join('modelo','modelo.COD_MARCA' ,'=','marca.COD_MARCA')->where('modelo.COD_CATEGORIA','=',$id)->where('marca.ACTIVO','=',1)->get();
        
    }
    public function score($id){
        $consulta=DB::select('SELECT e.id,e.nombre,e.colegio, c.descripcion FROM equipos e, categorias c WHERE e.id_categoria=c.id and c.id=:id',['id'=> $id]);
        return response()->json($consulta,201);
    }
    public function finalizar(Request $request, $id)
    {
        for($i=0;$i<$id;$i++){
            // return response()->json($request[$i]['id']);
            $consulta=DB::update('UPDATE equipos SET posicion =:p  WHERE id=:id',['p'=> $request[$i]['posicion'],'id'=>$request[$i]['id']]);
        }
        return response()->json(['status'=>'ok'],200);
    }
    public function colegio($id){
        $consulta=DB::select('SELECT e.id_colegio FROM equipos e, categorias c,concursos co WHERE e.id_categoria=c.id and c.id_concurso=co.id and co.id=:id group by e.id_colegio',['id'=> $id]);
        return response()->json($consulta,201);
    }
    public function listar_concurso($id)
    {
        $consulta=DB::select('SELECT e.id,e.nombre,e.cuenta,e.clave,e.id_colegio,ca.titulo,co.color,ca.titulo,ca.id as id_categoria, co.nombre as colegio FROM colegios co, equipos e, categorias ca, concursos c WHERE e.id_colegio=co.codigo and e.id_categoria=ca.id and ca.id_concurso=c.id and c.id=:id and NOT EXISTS(SELECT * FROM maquinas m WHERE e.id = m.id_equipo) ORDER BY ca.id,e.id_colegio',['id'=> $id]);
        return response()->json($consulta);
    }    
    public function listar_script($id)
    {
        $consulta=DB::select('SELECT e.id,e.nombre,e.cuenta,e.clave,e.id_colegio,ca.titulo,co.color,ca.titulo,ca.id as id_categoria, co.nombre as colegio FROM colegios co, equipos e, categorias ca, concursos c WHERE e.id_colegio=co.codigo and e.id_categoria=ca.id and ca.id_concurso=c.id and c.id=:id ORDER BY ca.id,e.id_colegio',['id'=> $id]);
        return response()->json($consulta);
    }    
    public function listar_concurso_categorias($id)
    {
        $categoria=Categoria::where('id_concurso',$id)->get();
        $ans=[];
        $i=0;
        // $no_existe='NOT EXISTS(SELECT * FROM maquinas m WHERE e.id = m.id_equipo)';
        foreach($categoria as $cat){

            $ans[$i]=DB::select('SELECT e.id,e.nombre,e.cuenta,e.clave,co.color,e.id_colegio,ca.id as id_categoria,ca.titulo FROM colegios co, equipos e, categorias ca WHERE e.id_colegio=co.codigo and e.id_categoria=ca.id and ca.id=:id and not EXISTS(SELECT * FROM maquinas m WHERE e.id = m.id_equipo ) ORDER BY ca.id,e.id_colegio,e.nombre',['id'=>$cat->id]);
                // 'SELECT e.id,e.nombre,e.cuenta,e.clave,e.id_colegio,ca.titulo,co.color,ca.titulo,ca.id as id_categoria FROM colegios co, equipos e, categorias ca, concursos c WHERE e.id_colegio=co.id and e.id_categoria='.$cat->id.' and ca.id_concurso=c.id and c.id=:id and NOT EXISTS(SELECT * FROM maquinas m WHERE e.id = m.id_equipo) ORDER BY ca.id,e.id_colegio,e.nombre',['id'=> $id]);
            // $ans[$i]='SELECT e.id,e.nombre,e.cuenta,e.clave,e.id_colegio,ca.titulo,co.color,ca.titulo,ca.id as id_categoria FROM colegios co, equipos e, categorias ca, concursos c WHERE e.id_colegio=co.id and e.id_categoria='.$cat->id.' and ca.id_concurso=c.id and c.id=:id and '.$no_existe.' ORDER BY ca.id,e.id_colegio';
            $i++;
        }
        // return response()->json($categoria);
        return response()->json($ans);
    }    
    public function importar(Request $request){
        $excel=$request->file('lista');
        $id=$request->id;
        $path_img='listado';
        $excelname = $path_img.'/'.$excel->getClientOriginalName();
        // return response()->json($excelname);
        try {
            Storage::disk('public')->put($excelname, File::get($excel));
        }
        catch (\Exception $exception) {
            return response('error',400);
        }
        $import = new EquiposImport();
        Excel::import($import,$excel);
        return $this->listar_concurso($id);
        // return response()->json(Equipo::get());
        // try{
        //     $file=$request->file('lista');
        //     return response()->json(Equipo::get());
        //     // return response()->json();
        // }
        // catch(\Maatwebsite\Excel\Validators\ValidationException $e){
        //     $fallas=$e->failures();
        //     foreach($fallas as $falla){
        //         $falla->row();
        //         // $falla->attibute();
        //         $falla->errors();
        //         $falla->values();
        //     }
        // }
    }
}
