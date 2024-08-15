<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Request;

class ClientService
{
    
    protected $cacheKey= 'clients';

    protected function getCacheKey(array $filters)
    {
        // Generate a unique cache key based on the filters
        return $this->cacheKey . ':' . md5(serialize($filters));
    }

    protected function clearCache()
    {
        Cache::forget($this->cacheKey);
    }

    public function getClients(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);

        return Cache::remember($cacheKey, 600, function () use ($filters) {
            $query = Client::query();

            if (isset($filters['search'])) {
                $query->where('fullname', 'like', "%{$filters['search']}%")
                ->orWhere('whatsapp', 'like', "%{$filters['search']}%")
                ->orWhere('country', 'like', "%{$filters['search']}%")
                ->orWhere('city', 'like', "%{$filters['search']}%")
                ->orWhere('address', 'like', "%{$filters['search']}%");    
            } 
            return $query->paginate(10);
        });
    }

    public function createClient(array $data)
    {
        $client = Client::create($data);
        $this->getCacheKey($data);
        $this->clearCache();
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
        $this->clearCache();
        Cache::forget('client:{$id}');

        return $client;
    }

    public function deleteClient(int $id)
    {
        $client = $this->getClientById($id);
        $this->clearCache();
        Cache::forget('client:{$id}');
        $client->delete();
    }


    public function restoreClient(int $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $this->clearCache();
        Cache::forget('client:{$id}');
        $client->restore();
    }

    public function forceDeleteClient(int $id)
    {
        $client = Client::withTrashed()->findOrFail($id);
        $this->clearCache();
        $client->forceDelete();
    }

    public function getRemovedClients(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);

        
            $query = Client::onlyTrashed();
            if (isset($filters['search'])) {
                $query->where('fullname', 'like', "%{$filters['search']}%")
                ->orWhere('whatsapp', 'like', "%{$filters['search']}%")
                ->orWhere('country', 'like', "%{$filters['search']}%")
                ->orWhere('city', 'like', "%{$filters['search']}%")
                ->orWhere('address', 'like', "%{$filters['search']}%");    
            }
            return $query->paginate(10);
        

    }

    public function countClients(): int
    {
        return Client::count();
    }

    // public function searchClients(Request $request)
    // {
    //     $query = $request->input('query');
    //     $clients = Client::where('fullname', 'like', "%{$query}%")->get();

    //     return response()->json($clients);
    // }
}
