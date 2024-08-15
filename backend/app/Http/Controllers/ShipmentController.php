<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShipmentRequest;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\http\JsonResponse;
use App\Services\ShipmentService;
use App\Http\Resources\ShipmentResource;



class ShipmentController extends Controller
{

    protected $shipmentService;

    public function __construct(ShipmentService $shipmentService)
    {
        $this->shipmentService = $shipmentService;
    }

    public function index(Request $request) : JsonResponse
    {

        $shipments = $this->shipmentService->getShipments($request->all());
        return response()->json([
            'data' => ShipmentResource::collection($shipments),
            'meta' => [
                'current_page' => $shipments->currentPage(),
                'last_page' => $shipments->lastPage(),
                'per_page' => $shipments->perPage(),
                'total' => $shipments->total(),
            ]
        ]);
        
    }

    public function store(ShipmentRequest $request) : JsonResponse
    {
        $shipment = $this->shipmentService->createShipment($request->validated());
        return response()->json(new ShipmentResource($shipment), 201);
    }

    public function show($id)
    {
        $shipment = $this->shipmentService->getShipmentById($id);
        return response()->json($shipment);
    }

    public function update(ShipmentRequest $request, $id)
    {
        $shipment = $this->shipmentService->updateShipment($id, $request->all());
        return response()->json(new ShipmentResource($shipment));
    }

    public function destroy($id)
    {
        $this->shipmentService->deleteShipment($id);
        return response()->json(['message' => 'Shipment deleted successfully']);
    }

    public function search(ShipmentRequest $request) : JsonResponse
    {
        $shipments = $this->shipmentService->searchShipment($request->validated());
        return response()->json([
            'data' => ShipmentResource::collection($shipments),
            'meta' => [
                'current_page' => $shipments->currentPage(),
                'last_page' => $shipments->lastPage(),
                'per_page' => $shipments->perPage(),
            ]
        ]);
    }

    public function getRemoved(): JsonResponse
    {
        $shipments = Shipment::onlyTrashed()->get();
        return response()->json($shipments);
    }

    public function restore($id) 
    {
        $shipment = $this->shipmentService->restoreShipment($id);
        return response()->json(new ShipmentResource($shipment));
    }

    public function forceDelete($id)
    {
        $shipment = $this->shipmentService->forceDeleteShipment($id);
        return response()->json(new ShipmentResource($shipment));
    }

    public function totalShipments() {

        $total = $this->shipmentService->getTotalShipments();
        return response()->json(['total' => $total]);
    }

    public function overview()
    {
        $totalShipments = Shipment::count();
        $activeShipments = Shipment::where('status', 'Active')->count();
        $completedShipments = Shipment::where('status', 'Arrived')->count();
        $pendingShipments = Shipment::where('status', 'Pending')->count();
        $cancelledShipments = Shipment::where('status', 'Cancelled')->count();

        
    
        // Group by month
        $monthlyShipments = Shipment::selectRaw('MONTH(shipment_date) as month, COUNT(*) as count')
                                    ->groupBy('month')
                                    ->orderBy('month')
                                    ->get();
    
        $monthlyActiveShipments = Shipment::selectRaw('MONTH(shipment_date) as month, COUNT(*) as count')
                                          ->where('status', 'Active')
                                          ->groupBy('month')
                                          ->orderBy('month')
                                          ->get();
    
        $monthlyCompletedShipments = Shipment::selectRaw('MONTH(shipment_date) as month, COUNT(*) as count')
                                             ->where('status', 'Arrived')
                                             ->groupBy('month')
                                             ->orderBy('month')
                                             ->get();

        $monthlyPendingShipments = Shipment::selectRaw('MONTH(shipment_date) as month, COUNT(*) as count')
                                            ->where('status', 'Pending')
                                            ->groupBy('month')
                                            ->orderBy('month')
                                            ->get();

        $monthlyCanneledShipments = Shipment::selectRaw('MONTH(shipment_date) as month, COUNT(*) as count')
                                            ->where('status', 'Cancelled')
                                            ->groupBy('month')
                                            ->orderBy('month')
                                            ->get();
    
        // Formatting the data to ensure all months are present
        $formattedMonthlyData = [];
        for ($i = 1; $i <= 12; $i++) {
            $formattedMonthlyData[$i] = [
                'total' => 0,
                'active' => 0,
                'completed' => 0,
                'pending' => 0,
                'cancelled' => 0
            ];
        }
    
        foreach ($monthlyShipments as $shipment) {
            $formattedMonthlyData[$shipment->month]['total'] = $shipment->count;
        }
    
        foreach ($monthlyActiveShipments as $shipment) {
            $formattedMonthlyData[$shipment->month]['active'] = $shipment->count;
        }
    
        foreach ($monthlyCompletedShipments as $shipment) {
            $formattedMonthlyData[$shipment->month]['completed'] = $shipment->count;
        }

        foreach ($monthlyPendingShipments as $shipment) {
            $formattedMonthlyData[$shipment->month]['pending'] = $shipment->count;
        }

        foreach ($monthlyCanneledShipments as $shipment) {
            $formattedMonthlyData[$shipment->month]['cancelled'] = $shipment->count;
        }
    
        $data = [
            'totalShipments' => $totalShipments,
            'activeShipments' => $activeShipments,
            'completedShipments' => $completedShipments,
            'pendingShipments' => $pendingShipments,
            'cancelledShipments' => $cancelledShipments,
            'monthlyData' => $formattedMonthlyData
        ];
    
        return response()->json($data);
    }

    public function getDeliveredShipmentsCount($driverId)
    {
        $count = Shipment::where('driver_id', $driverId)
                        ->count();
        return response()->json(['delivered_count' => $count]);
    }

    public function getPendingShipments($driverId) {

        $count = Shipment::where('driver_id', $driverId)
                            ->where('status', 'Pending')
                            ->count();
        return response()->json($count);
    }

    public function getShipmentByQrCode($qrCode)
    {
        $shipment = Shipment::where('qr_code', $qrCode)->first();

        if (!$shipment) {
            return response()->json(['error' => 'Shipment not found'], 404);
        }

        return response()->json($shipment);
    }




}
