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
        Schema::create('goods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shipment_id');
            $table->string('product_code', 100)->nullable();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('receiver_id');
            $table->string('category', 100)->nullable();
            $table->integer('quantity')->nullable();
            $table->string('weight', 50)->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('storage_location', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('qr_code')->nullable(); 
            $table->timestamps();

            $table->foreign('shipment_id')->references('id')->on('shipments')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->foreign('receiver_id')->references('id')->on('clients')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goods');
    }
};
