<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Shipment;
use App\Models\Client;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Goods>
 */
class GoodsFactory extends Factory
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
            'shipment_id' => Shipment::factory(),
            'product_code' => $this->faker->unique()->numerify('P###'),
            'client_id' => Client::factory(),
            'receiver_id' => Client::factory(),
            'category' => $this->faker->randomElement(['Clothes', 'Food', 'Medicines']),
            'quantity' => $this->faker->numberBetween(1, 100),
            'weight' => $this->faker->randomFloat(2, 0.5, 50),
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'storage_location' => $this->faker->randomElement(['Alhoceima', 'Nador','Madrid','Barcelona']),
            'description' => $this->faker->sentence,        
        ];
    }
}
