<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'id_usuario',
        'id_cliente',
        'total_venta',
        'total_compra',
        'fecha'
    ];
}
