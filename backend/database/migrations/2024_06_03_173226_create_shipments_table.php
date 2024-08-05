<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {

            $table->id();
            $table->string('tracking_number', 100)->unique();
            $table->unsignedBigInteger('driver_id')->nullable();
            $table->string('origin');
            $table->string('destination');
            $table->date('shipment_date')->nullable();
            $table->date('arrived_date')->nullable();
            $table->string('status');
            $table->string('qr_code')->nullable();  // QR code field
            $table->timestamps();

            $table->foreign('driver_id')->references('id')->on('drivers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
