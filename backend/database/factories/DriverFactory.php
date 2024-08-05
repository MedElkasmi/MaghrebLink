<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
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
            'status' => $this->faker->randomElement(['Available', 'Not Available'])
        ];
    }
}
