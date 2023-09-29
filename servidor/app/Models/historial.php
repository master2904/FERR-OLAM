<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class historial extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_venta',
        'id_detalle',
        'cantidad',
        'precio_compra',
        'precio_venta',
        'sub_total_compra',
        'sub_total_venta'
    ];   
}
