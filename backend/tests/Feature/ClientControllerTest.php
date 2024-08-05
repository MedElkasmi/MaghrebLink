<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Client;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Set up necessary roles
        Role::create(['name' => 'Admin']);
    }

    public function testIndexReturnsClients()
    {
        // Create a test user and assign the 'Admin' role
        $user = User::factory()->create();
        $user->assignRole('Admin'); // Assign the role using Spatie's method

        // Authenticate using Sanctum
        Sanctum::actingAs($user);

        // Create some test clients
        Client::factory()->count(5)->create();

        // Call the endpoint
        $response = $this->getJson('/api/clients');

        // Assertions
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'fullname', 'whatsapp', 'country', 'city', 'address']
                     ]
                 ]);
    }

    public function testStoreCreatesClient()
    {
        // Create a test user and assign the 'Admin' role
        $user = User::factory()->create();
        $user->assignRole('Admin');

        // Authenticate using Sanctum
        Sanctum::actingAs($user);

        // Test data
        $data = [
            'fullname' => 'John Doe',
            'whatsapp' => '123456789',
            'country' => 'Country A',
            'city' => 'City B',
            'address' => '123 Main St',
        ];

        // Call the endpoint
        $response = $this->postJson('/api/clients', $data);

        // Assertions
        $response->assertStatus(201)
                 ->assertJsonFragment(['fullname' => 'John Doe']);
    }

    public function testShowReturnsClient()
    {
        // Create a test user and assign the 'Admin' role
        $user = User::factory()->create();
        $user->assignRole('Admin');

        // Authenticate using Sanctum
        Sanctum::actingAs($user);

        // Create a test client
        $client = Client::factory()->create();

        // Call the endpoint
        $response = $this->getJson('/api/clients/' . $client->id);

        // Assertions
        $response->assertStatus(200)
                 ->assertJsonFragment(['fullname' => $client->fullname]);
    }

    public function testUpdateModifiesClient()
    {
        // Create a test user and assign the 'Admin' role
        $user = User::factory()->create();
        $user->assignRole('Admin');

        // Authenticate using Sanctum
        Sanctum::actingAs($user);

        // Create a test client
        $client = Client::factory()->create();

        // New data
        $data = [
            'fullname' => 'Jane Doe',
            'whatsapp' => '987654321',
            'country' => 'Country B',
            'city' => 'City C',
            'address' => '456 Another St',
        ];

        // Call the endpoint
        $response = $this->putJson('/api/clients/' . $client->id, $data);

        // Assertions
        $response->assertStatus(200)
                 ->assertJsonFragment(['fullname' => 'Jane Doe']);
    }

    public function testDestroyDeletesClient()
    {
        // Create a test user and assign the 'Admin' role
        $user = User::factory()->create();
        $user->assignRole('Admin');

        // Authenticate using Sanctum
        Sanctum::actingAs($user);

        // Create a test client
        $client = Client::factory()->create();

        // Call the endpoint
        $response = $this->deleteJson('/api/clients/' . $client->id);

        // Assertions
        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Client deleted successfully']);
    }
}
