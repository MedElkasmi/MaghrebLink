<?php

namespace App\Services;

use App\Models\Client;

class ClientService
{
    /**
     * Get a list of clients with optional search.
     *
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getClients(array $filters)
    {
        $query = Client::query();

        if (isset($filters['search'])) {
            $query->where('fullname', 'like', "%{$filters['search']}%");
        }

        return $query->paginate(10);
    }

    /**
     * Create a new client.
     *
     * @param array $data
     * @return Client
     */
    public function createClient(array $data)
    {
        return Client::create($data);
    }

    /**
     * Get a client by ID.
     *
     * @param int $id
     * @return Client
     */
    public function getClientById(int $id)
    {
        return Client::findOrFail($id);
    }

    /**
     * Update a client.
     *
     * @param int $id
     * @param array $data
     * @return Client
     */
    public function updateClient(int $id, array $data)
    {
        $client = $this->getClientById($id);
        $client->update($data);

        return $client;
    }

    /**
     * Delete a client.
     *
     * @param int $id
     * @return void
     */
    public function deleteClient(int $id)
    {
        $client = $this->getClientById($id);
        $client->delete();
    }

    /**
     * Restore a soft-deleted client.
     *
     * @param int $id
     * @return void
     */
    public function restoreClient(int $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $client->restore();
    }

    /**
     * Permanently delete a soft-deleted client.
     *
     * @param int $id
     * @return void
     */
    public function forceDeleteClient(int $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $client->forceDelete();
    }

    /**
     * Get a list of soft-deleted clients.
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getRemovedClients()
    {
        return Client::onlyTrashed()->paginate(10);
    }

    /**
     * Count total clients.
     *
     * @return int
     */
    public function countClients(): int
    {
        return Client::count();
    }
}
