<?php

namespace App\Http\Controllers;

use App\Models\Tracking;
use Illuminate\Http\Request;
use App\Models\Shipment;

class TrackingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $tracking = new Tracking();
        $tracking->shipment_id = $request->input('shipment_id');
        $tracking->latitude = $request->input('latitude');
        $tracking->longitude = $request->input('longitude');
        $tracking->status = $request->input('status');
        $tracking->save();

        return response()->json(['message' => 'Tracking data saved successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tracking $tracking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tracking $tracking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tracking $tracking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tracking $tracking)
    {
        //
    }

    public function updateTracking(Request $request) {
        $request->validate([
            'tracking_number' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'status' => 'required|string',
        ]);

        $shipment = Shipment::where('tracking_number', $request->tracking_number)->first();

        if (!$shipment) {
            return response()->json(['message' => 'Shipment not found'], 404);
        }

        $tracking = new Tracking([
            'shipment_id' => $shipment->id,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => $request->status,
        ]);

        $tracking->save();

        return response()->json(['message' => 'Tracking updated successfully'], 200);
    }

    public function getTracking($tracking_number) {
        $shipment = Shipment::where('tracking_number', $tracking_number)->first();

        if (!$shipment) {
            return response()->json(['message' => 'Shipment not found'], 404);
        }

        $trackings = Tracking::where('shipment_id', $shipment->id)->get();

        return response()->json($trackings);
    }
}
