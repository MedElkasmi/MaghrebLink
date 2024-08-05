<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\http\JsonResponse;
use Illuminate\Support\Facades\DB;



class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Shipment::query();
        $shipment = $query->paginate(10);

        return response()->json($shipment);
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
            'origin' => 'required',
            'destination' => 'required',
            'shipment_date'=> 'required',
        ]);

        $shipments = Shipment::create($request->all());

        return response()->json($shipments, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //

        // $shipment = Shipment::where('tracking_number', $id)->first();

        // if ($shipment) {
        //     return response()->json($shipment);
        // } else {
        //     return response()->json(['error' => 'Shipment not found'], 404);
        // }

        $shipment = Shipment::findOrFail($id);
        return response()->json($shipment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipment $shipment)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        
        $request->validate([
            'origin' => 'required',
            'destination' => 'required',
            'shipment_date'=> 'required',
        ]);

        $shipment = Shipment::findOrFail($id);
        $shipment->update($request->all());

        return response()->json($shipment, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $shipment = Shipment::findOrFail($id);
        $shipment->delete();

        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $shipments = Shipment::where('tracking_number', 'like', "%{$query}%")->get();

        return response()->json($shipments);
    }

    public function getRemoved(): JsonResponse
    {
        $shipments = Shipment::onlyTrashed()->paginate(10);
        return response()->json($shipments);
    }

    public function restore($id) 
    {
        $shipment = Shipment::withTrashed()->find($id);
        $shipment->restore();

        return response()->json(['message' => 'Shipment restored successfully']);
    }

    public function forceDelete($id)
    {
        $shipment = Shipment::withTrashed()->findOrFail($id);
        $shipment->forceDelete();
        return response()->json(['message' => 'Shipment permanently deleted successfully']);
    }

    public function totalShipments() {

        $total = Shipment::count();
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
