<?php

namespace App\Services;
use App\Models\Driver;
use App\Models\Shipment;
use App\Models\Goods;

class DriverService
{
    public function getDrivers()
    {
        //
        $query = Driver::query();
        return $query->paginate(10);
    }

    public function getDriverById($id)
    {
        //
        $driver = Driver::findOrFail($id);
        return $driver;
    }

    public function createDriver($data)
    {
        //
        $driver = Driver::create($data);
        return $driver;
    }

    public function updateDriver($id, $data)
    {
        //
        $driver = Driver::findOrFail($id);
        $driver->update($data);
        return $driver;
    }

    public function deleteDriver($id)
    {
        //
        Driver::destroy($id);
    }

    public function getTotalGoodsWeight($driverId) {

        $shipments = Shipment::where('driver_id', $driverId)->pluck('id');
        $totalWeight = Goods::whereIn('shipment_id', $shipments)->sum('weight');

        return $totalWeight;
    }

    public function searchDrivers(array $query)
    {
        $drivers = Driver::where('fullname', 'like', "%{$query['search']}%")->get();
        return $drivers;
    }
}