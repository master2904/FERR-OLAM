<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problema extends Model
{
    use HasFactory;
    protected $fillable = [
        'alias',
        'titulo',
        'id_categoria',
        'dificultad',
        'autor',
        'color',
    ];        
}
