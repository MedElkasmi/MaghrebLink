<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\DriverService;
use App\Http\Resources\DriverResource;
use App\Http\Requests\DriverRequest;
use App\Models\Shipment;

class DriverController extends Controller
{

    protected $driverService;

    public function __construct(DriverService $driverService)
    {
        $this->driverService = $driverService;
    }

    public function index() 
    {
        //
        $drivers = $this->driverService->getDrivers();
        return response()->json([
            'data' => DriverResource::collection($drivers),
            'meta' => [
                'current_page' => $drivers->currentPage(),
                'last_page' => $drivers->lastPage(),
                'per_page' => $drivers->perPage(),
                'total' => $drivers->total(),
            ]
        ]);
        
    }

    public function store(DriverRequest $request) : JsonResponse
    {
        //
        $drivers = $this->driverService->createDriver($request->validated());
        return response()->json(new DriverResource($drivers), 201);
    }

    public function show($id) : JsonResponse
    {
        //
        $driver = $this->driverService->getDriverById($id);
        return response()->json($driver);
    }

    public function update(DriverRequest $request, Driver $driver) : JsonResponse
    {
        //
        $driver = $this->driverService->updateDriver($driver->id, $request->validated());
        return response()->json(new DriverResource($driver));
    }

    public function destroy($id) : JsonResponse
    {
        //
        $this->driverService->deleteDriver($id);
        return response()->json(['message' => 'Driver deleted successfully']);
    }

    public function getTotalGoodsWeight($driverId) : JsonResponse
    {   
        $weight = $this->driverService->getTotalGoodsWeight($driverId);
        return response()->json(['total_weight' => $weight]);
    }

    public function search(Request $request) : JsonResponse
    {
        //
        $query = $request->input('query');
        $drivers = Driver::where('fullname', 'like', "%{$query}%")->get();

        return response()->json($drivers);
    }

}
