<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age',
        'phone',
        'license',
        'picture',
        'status',
    ];

    public function shipments() {

        return $this->hasMany(Shipment::class);
    }
}
