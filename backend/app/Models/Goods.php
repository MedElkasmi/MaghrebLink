<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Goods extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'shipment_id',
        'product_code',
        'client_id',
        'receiver_id',
        'weight',
        'price',	
        'storage_location',
        'status',
        'qr_code'
    ];

    public function shipment()
    {
        return $this->belongsTo(Shipment::class);
    }

    public function Client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function receiver()
{
    return $this->belongsTo(Client::class, 'receiver_id');
}

    public function issues()
    {
        return $this->hasMany(Issue::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($good) {
            $good->product_code = self::generateUniqueProductCode();
        });
    }

    private static function generateUniqueProductCode()
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        do {
            $productCode = '';
            for ($i = 0; $i < 18; $i++) {
                $productCode .= $characters[rand(0, strlen($characters) - 1)];
            }
        } while (self::where('product_code', $productCode)->exists());

        return $productCode;
    }

}
