<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $deliveries = Delivery::all();
        return response()->json($deliveries, 200);
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
            'shipment_id' => 'required|exists:shipments,id',
            'received_by' => 'nullable|string',
            'signature' => 'nullable|string',
            'proof_of_delivery' => 'nullable|string',
            'status' => 'nullable|in:pending,delivered,failed',
            'delivery_date' => 'nullable|date',
            'comments' => 'nullable|string',
        ]);

        $delivery = Delivery::create($request->all());

        return response()->json($delivery, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $delivery = Delivery::where('shipment_id', $id)->firstOrFail();
        return response()->json($delivery, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Delivery $delivery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Delivery $delivery)
    {
        //
        $delivery = Delivery::findOrFail($delivery);

        $request->validate([
            'received_by' => 'nullable|string',
            'signature' => 'nullable|string',
            'proof_of_delivery' => 'nullable|string',
            'status' => 'nullable|in:pending,delivered,failed',
            'delivery_date' => 'nullable|date',
            'comments' => 'nullable|string',
        ]);

        $delivery->update($request->all());

        return response()->json($delivery, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Delivery $delivery)
    {
        //
        $delivery = Delivery::findOrFail($delivery);

        $delivery->delete();

        return response()->json(null, 204);
    }
}
