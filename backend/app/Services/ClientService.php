<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\Cache;

class ClientService
{
    
    protected $cacheKey= 'clients';

    protected function getCacheKey(array $filters)
    {
        // Generate a unique cache key based on the filters
        return $this->cacheKey . ':' . md5(serialize($filters));
    }

    public function getClients(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);

        return Cache::remember($cacheKey, 600, function () {
            $query = Client::query();

            if (isset($filters['search'])) {
                $query->where('fullname', 'like', "%{$filters['search']}%");
            } 
            return $query->paginate(10);
        });
    }

    public function createClient(array $data)
    {
        $client = Client::create($data);
        $client->clearCache();
        return $client;

    }

    public function getClientById(int $id)
    {
        return Cache::remember('client:{$id}', 600 , function () use ($id) {
            return Client::findOrFail($id);
        });
    }

    public function updateClient(int $id, array $data)
    {
        $client = $this->getClientById($id);
        $client->update($data);
        $client->clearCahce();
        Cache::forget('client:{$id}');

        return $client;
    }

    public function deleteClient(int $id)
    {
        $client = $this->getClientById($id);
        $client->clearCahce();
        Cache::forget('client:{$id}');
        $client->delete();
    }


    public function restoreClient(int $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $client->clearCahce();
        Cache::forget('client:{$id}');
        $client->restore();
    }

    public function forceDeleteClient(int $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $client->forceDelete();
    }

    public function getRemovedClients()
    {
        return Client::onlyTrashed()->paginate(10);
    }

    public function countClients(): int
    {
        return Client::count();
    }
}
