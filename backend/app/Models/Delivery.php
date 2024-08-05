<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $table = 'deliveries';

    protected $fillable = [
        'shipment_id',
        'received_by',
        'signature',
        'proof_of_delivery',
        'delivery_date',
    ];

    public function shipment() {
        return $this->belongsTo(Shipment::class);
    }
}
