<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laboratorio extends Model
{
    use HasFactory;
    protected $fillable=[
        'aula',
        'jefe_labo',
        'maquinas',
        'columnas',
        'imagen'
    ];
}
