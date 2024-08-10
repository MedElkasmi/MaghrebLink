<?php

namespace App\Services;

use App\Models\Goods;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GoodService
{
    protected $cacheKey = 'goods';

    protected function getCacheKey(array $filters): string
    {
        return $this->cacheKey . ':' . md5(serialize($filters));
    }

    protected function clearCache()
    {
        Cache::forget($this->cacheKey);
    }

    public function getGoods(array $filters)
    {
        $cacheKey = $this->getCacheKey($filters);

        return Cache::remember($cacheKey, 600, function () use ($filters) {
            $query = Goods::with(['shipment', 'client', 'receiver']);

            if (isset($filters['search'])) {
                $query->where('description', 'like', "%{$filters['search']}%");
            }

            return $query->paginate(10);
        });
    }

    public function createGood(array $data)
    {
        $good = Goods::create($data);
        $this->clearCache();
        return $good;
    }

    public function getGoodById(int $id)
    {
        return Cache::remember("good:{$id}", 600, function () use ($id) {
            return Goods::with(['shipment', 'client', 'receiver'])->findOrFail($id);
        });
    }

    public function updateGood(int $id, array $data)
    {
        $good = $this->getGoodById($id);
        $good->update($data);
        $this->clearCache();
        Cache::forget("good:{$id}");
        return $good;
    }

    public function deleteGood(int $id)
    {
        $good = $this->getGoodById($id);
        $good->delete();
        $this->clearCache();
        Cache::forget("good:{$id}");
    }

    public function restoreGood(int $id)
    {
        $good = Goods::withTrashed()->findOrFail($id);
        $good->restore();
        $this->clearCache();
        Cache::forget("good:{$id}");
    }

    public function forceDeleteGood(int $id)
    {
        $good = Goods::withTrashed()->findOrFail($id);
        $good->forceDelete();
        $this->clearCache();
        Cache::forget("good:{$id}");
    }

    public function getRemoved()
    {
        return Goods::onlyTrashed()->with(['shipment', 'client', 'receiver'])->paginate(10);
    }

    public function getTotalGoods(): int
    {
        return Goods::count();
    }

    public function getTotalWeight(): float
    {
        return Goods::sum('weight');
    }
}
