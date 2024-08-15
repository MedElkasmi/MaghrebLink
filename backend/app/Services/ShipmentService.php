<?php

namespace App\Services;

use App\Models\Shipment;
use Illuminate\Support\Facades\Cache;

class ShipmentService {

    protected $cacheKey = 'shipments';

    protected function getCacheKey(array $filters): string
    {
        return $this->cacheKey . ':' . md5(serialize($filters));
    }

    protected function clearCache()
    {
        Cache::forget($this->cacheKey);
    }

    public function getShipments(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);

        return Cache::remember($cacheKey, 30, function () use ($filters) {
            $query = Shipment::with(['driver']);

            if (isset($filters['search'])) {
                $query->where('tracking_number', 'like', "%{$filters['search']}%");
            }
            return $query->paginate(10);
        });
    }

    public function createShipment(array $data)
    {
        $shipment = Shipment::create($data);
        $this->clearCache();
        return $shipment;
    }

    public function getShipmentById(int $id)
    {
        return Cache::remember("shipment:{$id}", 600, function () use ($id) {
            return Shipment::findOrFail($id);
        });
    }

    public function updateShipment(int $id, array $data)
    {
        $shipment = Shipment::findOrFail($id);
        $shipment->update($data);
        $this->clearCache();
        return $shipment;
    }

    public function deleteShipment(int $id)
    {
        $shipment = Shipment::findOrFail($id);
        $shipment->delete();
        $this->clearCache();
        return $shipment;
    }

    public function getTotalShipments(): int
    {
        return Shipment::count();
    }

    public function getRemoved(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);
        return Cache::remember($cacheKey, 30, function () use ($filters) {
            $query = Shipment::onlyTrashed();
            if (isset($filters['search'])) {
                $query->where('tracking_number', 'like', "%{$filters['search']}%");
            }
            return $query->paginate(10);
        });
    }

    public function restore($id) 
    {
        $shipment = Shipment::withTrashed()->find($id);
        $shipment->restore();
        $this->clearCache();
        return $shipment;
    }

    public function forceDelete($id)
    {
        $shipment = Shipment::withTrashed()->findOrFail($id);
        $shipment->forceDelete();
        $this->clearCache();
        return $shipment;
    }

    public function restoreShipment(int $id)
    {
        $shipment = Shipment::withTrashed()->findOrFail($id);
        $shipment->restore();
        $this->clearCache();
        return $shipment;
    }

    public function forceDeleteShipment(int $id)
    {
        $shipment = Shipment::withTrashed()->findOrFail($id);
        $shipment->forceDelete();
        $this->clearCache();
        return $shipment;
    }

    public function totalShipments() {  
        $total = Shipment::count();
        return response()->json(['total' => $total]);
    }

    public function searchShipment(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);
        return Cache::remember($cacheKey, 30, function () use ($filters) {
            $query = Shipment::query();
            if (isset($filters['search'])) {
                $query->where('tracking_number', 'like', "%{$filters['search']}%");
            }
            return $query->paginate(10);
        });
    }

}