<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;

class Equipo extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'id_colegio',
        'cuenta',
        'clave',
        'id_categoria',
        'posicion'
    ];   
}
