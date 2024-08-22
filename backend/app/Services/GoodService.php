<?php

namespace App\Services;

use App\Models\Goods;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GoodService
{
    protected $cacheKey = 'goods';
    protected $defaultPricePerUnitWeight = 20.0; // MAD

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

        return Cache::remember($cacheKey, 30, function () use ($filters) {
            $query = Goods::with(['shipment', 'client', 'receiver']);

            if (isset($filters['search'])) {
                $query->where('status', 'like', "%{$filters['search']}%")
                    ->orWhere('shipment_id', 'like', "%{$filters['search']}%");
            }
      

            return $query->orderBy('created_at', 'desc')->paginate(10);
        });
    }

    public function createGood(array $data)
    {

        if(isset($data['weight'])) {
            $data['price'] = $data['weight'] * $this->defaultPricePerUnitWeight;
        }

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

    public function getRemoved(array $filters)
    {
        $query = Goods::onlyTrashed()->with(['shipment', 'client', 'receiver']);
        if (isset($filters['search'])) {
            $query->whereHas('client', function($q) use ($filters) {
                $q->where('fullname', 'like', "%{$filters['search']}%");
            })->orWhereHas('receiver', function($q) use ($filters) {
                $q->where('fullname', 'like', "%{$filters['search']}%");
            });
        }
        return $query->paginate(10);
    }
    

    public function getTotalGoods(): int
    {
        return Goods::count();
    }

    public function getTotalWeight(): float
    {
        return Goods::sum('weight');
    }

    public function getTotalPrice(): array
    {
        $currentYear = Carbon::now()->year;

        // Grouping by month and summing prices
        $monthlyTotals = Goods::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(price) as total')
            )
            ->whereYear('created_at', $currentYear) // Filter for the current year
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();

        $labels = [];
        $data = [];

        // Initialize all months with 0
        for ($month = 1; $month <= 12; $month++) {
            $labels[] = Carbon::createFromDate(null, $month, 1)->format('F');
            $data[] = 0; // Default value for each month
        }

        // Populate the data array with the actual totals
        foreach ($monthlyTotals as $total) {
            $data[$total->month - 1] = $total->total;
        }

        return [
            'labels' => $labels,
            'series' => [
                [
                    'name' => 'Total Price',
                    'data' => $data
                ]
            ]
        ];
    }
}
