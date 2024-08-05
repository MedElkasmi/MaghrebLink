<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use App\Models\Shipment;
use App\Models\Goods;


class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $query = Driver::query();
        $driver = $query->paginate(10);
        return response()->json($driver);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required',
            'age' => 'required',
            'phone' => 'required',
            'license' => 'required',
            'picture' => 'required',
            'status' => 'required',
        ]);

        $driver = Driver::create($request->all());
        return response()->json($driver);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //

        $driver = Driver::findOrFail($id);

        return response()->json($driver);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Driver $driver)
    {
        //
        $request->validate([
            'name' => 'required',
            'age' => 'required',
            'phone' => 'required',
            'license' => 'required',
            'picture' => 'required',
            'status' => 'required',
        ]);

        $driver = Driver::findOrFail($driver->id);
        $driver->update($request->all());

        return response()->json($driver, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Driver::destroy($id);
        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $drivers = Driver::where('fullname', 'like', "%{$query}%")->get();

        return response()->json($drivers);
    }

    public function getTotalGoodsWeight($driverId) {
        $shipments = Shipment::where('driver_id', $driverId)->pluck('id');
        $totalWeight = Goods::whereIn('shipment_id', $shipments)->sum('weight');
        return response()->json(['total_weight' => $totalWeight]);
    }

}
