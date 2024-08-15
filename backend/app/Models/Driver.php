<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'whatsapp',
        'status'
    ];

    public function shipments() {

        return $this->hasMany(Shipment::class);
    }
}
