<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Events\ShipmentStatusUpdated;

class Shipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'tracking_number',
        'driver_id',
        'shipment_date',
        'arrived_date ',
        'status',
        'qr_code'
    ];

    // protected $dispatchesEvents = [
    //     'updated' => ShipmentStatusUpdated::class,
    // ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function goods()
    {
        return $this->hasMany(Goods::class);
    }

    public function issues()
    {
        return $this->hasMany(Issue::class);
    }

    public function tracking()
    {
        return $this->hasMany(Tracking::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($shipment) {
            $shipment->generateTrackingNumber();
            $shipment->generateQrCode();
        });

        static::updating(function ($shipment) {
            $shipment->generateQrCode();
        });

        static::deleting(function ($shipment) {
            if ($shipment->isForceDeleting()) {
                $shipment->goods()->withTrashed()->forceDelete();
            } else {
                $shipment->goods()->each(function ($good) {
                    $good->delete();
                });
            }
        }); 
    }

    public function generateTrackingNumber()
    {
        do {
            $trackingNumber = strtoupper(uniqid('SHIP'));
        } while (self::where('tracking_number', $trackingNumber)->exists());

        $this->tracking_number = $trackingNumber;
    }

    public function generateQrCode()
    {
        $qrCode = QrCode::format('png')->size(300)->generate($this->tracking_number);
        $qrCodePath = 'qrcodes/shipments/' . uniqid() . '.png';
        Storage::disk('public')->put($qrCodePath, $qrCode);
        $this->qr_code = $qrCodePath;
    }
}
