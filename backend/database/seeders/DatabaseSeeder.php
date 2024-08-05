<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tracking;
use App\Models\Shipment;
use App\Models\Client;
use App\Models\Goods;
use App\Models\Delivery;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Client::factory()->count(30)->create();
        Shipment::factory()->count(30)->create();
        Goods::factory()->count(30)->create();
        Tracking::factory()->count(30)->create();
        $this->call(RolesAndPermissionsSeeder::class);
    }
}
