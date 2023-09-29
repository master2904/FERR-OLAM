<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use JWTAuth;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsuarioController extends Controller
{
    public function index()
    {
        $users = User::select("*")->orderBy("apellido", "asc")->get();
        return response()->json($users,200);
    }
    public function authenticate(Request $request)
    {
        // return response()->json("");
        $credentials = $request->only('username', 'password');
         try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Cuenta o Contraseña incorrecta'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Error de coneccion'], 500);
        }
        $user = JWTAuth::user();
        return  response()->json([
            'status' => 'ok',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function getAuthenticatedUser()
    {
    try {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
        }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'rol' => 'required',
            'imagen'=>'required',
            'username' => 'required|string|max:25',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            ]);
        // $lista=User::where('username',$request->input('username'))->get();
        // return response()->json(empty($lista));
        // if(empty($lista))
        //     return response()->json(['error' => 'Usuario existente'], 400);
        $user = User::create([
            'nombre' => $request->get('nombre'),
            'apellido' => $request->get('apellido'),
            'username' => $request->get('username'),
            'rol' => $request->get('rol'),
            'imagen' => $request->get('imagen'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);
        return $this->index();
        // $users = User::select("*")->orderBy("apellido", "asc")->get();
        // return response()->json($users,200);
    }
    public function imageUpload(Request $request){
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);
        $imagen=$request->file('image');
        $path_img='usuario';
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
        return response()->download(public_path('storage').'/usuario/'.$nombre,$nombre);
    }
    public  function descargar($nombre){
        $public_path = public_path();
        $url = $public_path.'/'.$nombre;// depende de root en el archivo filesystems.php.
        //verificamos si el archivo existe y lo retornamos
        // if (Storage::disk('images')->exists($nombre))
        // {
            // echo "ye";
        $miimagen = public_path('storage').'/usuario/'.'20218513118.jpeg';
        return $miimagen;
        if(@getimagesize($miimagen))
        //    return Storage::download($miimagen);
            // return response()->json(Storage::download($miimagen));
            return response()->json($miimagen);
        else
            return response()->json(array($nombre,"maldicion"));
        abort(404);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        return response()->json(User::find($id));   
    }
    public function edit($id){
    }
    public function update( $id,Request $request){
        $equipo=User::find($id);
        $input=$request->all();
        
        $equipo['nombre']=$request->get('nombre');
        $equipo['apellido']=$request->get('apellido');
        $equipo['username']=$request->get('username');
        $equipo['rol']=$request->get('rol');
        // $equipo['email']=$request->get('email');
        if($input['imagen']!="")
            $equipo['imagen']=$input['imagen'];
        if($input['password']!=""){
            $clave=$request->get('password');
            $equipo['password']=Hash::make($clave);
        }
        $equipo->save();
        return $this->index();
        // $users = User::select("*")->orderBy("apellido", "asc")->get();
        // return response()->json($users,200);
        // return response()->json(User::get(),200);
    }
    public function destroy ($id)
    {
        if($id==1)
            return response()->json(['error' => 'Super Usuario'], 400);
        User::find($id)->delete();
        // return response()->json(array('success'=>'Equipo Eliminado'));
        return response()->json(User::get(),200);
    }
}
