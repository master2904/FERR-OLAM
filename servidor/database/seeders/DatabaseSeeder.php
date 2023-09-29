<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Concurso;
use App\Models\Colegio;
use App\Models\Detalle;
use App\Models\Problema;
use App\Models\Product;
use App\Models\User;
use App\Models\Tipo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //\App\Models\User::factory(10)->create();
        DB::table('users')->delete();
		User::create(array(
			'rol' => 1,
			'nombre' => 'Joel',
			'apellido' => 'Gonzales Aguilar',
			'username' => 'master',
			'imagen'=>'20233721535.jpg',
			'password' => Hash::make('master123456')
		));
		User::create(array(
			'rol' => 1,
			'nombre' => 'Oscar',
			'apellido' => 'Choque Gonzales',
			'username' => 'oscar',
			'imagen'=>'202337215252.jpg',
			'password' => Hash::make('oscar123456')
		));
		Product::create(array(
			'nombre'=>'CALAMINA',
			'imagen'=>'2023461108.jpg',
			'lugar'=>'1'
		));
		Product::create(array(
			'nombre'=>'CLAVO',
			'imagen'=>'20234611027.jpg',
			'lugar'=>'1'
		));
		Product::create(array(
			'nombre'=>'ALAMBRE',
			'imagen'=>'2023461101.jpg',
			'lugar'=>'1'
		));
		Product::create(array(
			'nombre'=>'VIGAS',
			'imagen'=>'202331232325.jpg',
			'lugar'=>'0'
		));
		Product::create(array(
			'nombre'=>'LISTONES',
			'imagen'=>'202331232325.jpg',
			'lugar'=>'0'
		));
		Tipo::create(array(
			'id_producto'=>'1',
			'descripcion'=>'GALVANIZADO 3X4'
		));
		Tipo::create(array(
			'id_producto'=>'1',
			'descripcion'=>'GALVANIZADO 3X16'
		));
		Tipo::create(array(
			'id_producto'=>'1',
			'descripcion'=>'GALVANIZADO 3X8'
		));
		Tipo::create(array(
			'id_producto'=>'2',
			'descripcion'=>'3/4'
		));
		Tipo::create(array(
			'id_producto'=>'2',
			'descripcion'=>'3/8'
		));
		Tipo::create(array(
			'id_producto'=>'2',
			'descripcion'=>'3/16'
		));
		Detalle::create(array(
			'id_tipo'=>'1',
            'codigo'=>'0001',
			'descripcion'=>'18',
            'cantidad_minima'=>'200',
            'precio_compra'=>'15',
            'precio_venta'=>'18',
            'stock'=>'10',
			'id_vendor'=>'0'
		));
		Detalle::create(array(
			'id_tipo'=>'1',
            'codigo'=>'0001',
			'descripcion'=>'12',
            'cantidad_minima'=>'200',
            'precio_compra'=>'15',
            'precio_venta'=>'18',
            'stock'=>'10',
			'id_vendor'=>'0'
		));
		Detalle::create(array(
			'id_tipo'=>'1',
            'codigo'=>'0001',
			'descripcion'=>'108',
            'cantidad_minima'=>'200',
            'precio_compra'=>'15',
            'precio_venta'=>'18',
            'stock'=>'10',
			'id_vendor'=>'0'
		));
    }
}
