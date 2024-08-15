<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Driver;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'tracking_number' => $this->faker->unique()->regexify('SHIP[0-9A-Z]{10}'),
            'driver_id' => Driver::factory(),
            'shipment_date' => $this->faker->date(),
            'arrived_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['In-transit', 'Arrived']),
        ];
    }
}
