<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Picqer\Barcode\BarcodeGeneratorPNG;

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

 

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($shipment) {
            $shipment->generateTrackingNumber();
            $shipment->generateBarCode();
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
            // Generate a random 14-digit number
            $trackingNumber = str_pad(mt_rand(1, 99999999999999), 14, '0', STR_PAD_LEFT);
        } while (self::where('tracking_number', $trackingNumber)->exists());
    
        $this->tracking_number = $trackingNumber;
    }

    public function generateBarCode()
    {
        // Load the font path from the system
        $fontPath = storage_path('app/public/fonts/LiberationSans-Regular.ttf');
    
        // Generate barcode image using Picqer library
        $barcodeGenerator = new BarcodeGeneratorPNG();
        $barcodeData = $barcodeGenerator->getBarcode($this->tracking_number, $barcodeGenerator::TYPE_CODE_128,2,100);
    
        // Create a blank image with a white background
        $barcodeImageWidth = 300; // Adjust the width as needed
        $barcodeImageHeight = 150; // Adjust the height to make barcode lines taller
        $image = imagecreatetruecolor($barcodeImageWidth, $barcodeImageHeight);
        $backgroundColor = imagecolorallocate($image, 255, 255, 255); // White background
        imagefill($image, 0, 0, $backgroundColor);
    
        // Load the barcode onto the image
        $barcodeImage = imagecreatefromstring($barcodeData);
        $barcodeWidth = imagesx($barcodeImage);
        $barcodeHeight = imagesy($barcodeImage);
    
        // Adjust placement of barcode to make the lines taller
        $barcodePlacementY = 10; // Adjust Y placement for taller barcode lines
        $barcodePlacementX = ($barcodeImageWidth - $barcodeWidth) / 2;
        imagecopy($image, $barcodeImage, $barcodePlacementX, $barcodePlacementY, 0, 0, $barcodeWidth, $barcodeHeight);
    
        // Add text (tracking number) centered below the barcode
        $textColor = imagecolorallocate($image, 0, 0, 0); // Black color for text
        $textSize = 12; // Adjust text size as needed
        $textBox = imagettfbbox($textSize, 0, $fontPath, $this->tracking_number);
        $textWidth = $textBox[2] - $textBox[0];
        $textX = ($barcodeImageWidth - $textWidth) / 2; // Center text horizontally
        $textY = $barcodeImageHeight - 10; // Adjust Y position for text below the barcode
        imagettftext($image, $textSize, 0, $textX, $textY, $textColor, $fontPath, $this->tracking_number);
    
        // Save the image to the public storage
        $barcodePath = 'barcodes/shipments/' . uniqid() . '.png';
        imagepng($image, storage_path('app/public/' . $barcodePath));
        imagedestroy($image); // Free up memory
        $this->barcode = $barcodePath; // Save path to the barcode in the model
    }
}
