<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concurso extends Model
{
    use HasFactory;
    protected $fillable = [
        'imagen',
        'titulo',
        'fecha',
        'estado',
        'hora'
    ];
    public function categoria(){
        return $this->belongsTo(Categoria::class);
    }
}
