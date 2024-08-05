<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
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
            'fullname' => $this->faker->name,
            'whatsapp' => $this->faker->phoneNumber,
            'country' => $this->faker->country,
            'city' => $this->faker->city,
            'address' => $this->faker->address,
        ];
    }
}
