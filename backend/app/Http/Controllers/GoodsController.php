<?php

namespace App\Http\Controllers;

use App\Models\Goods;
use Illuminate\Http\Request;

class GoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $query = Goods::with('shipment', 'client', 'receiver'); // Include the shipment relationship

        // if ($request->has('search')) {
        //     $search = $request->input('search');
        //     $query->where('quantity', 'like', "%{$search}%")
        //         ->orWhere('description', 'like', "%{$search}%")
        //         ->orWhere('weight', 'like', "%{$search}%");
        // }

        $goods = $query->paginate(10);

        return response()->json($goods);
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
            'quantity' => 'required',
            'description' => 'required',
            'weight' => 'required',
        ]);

        $goods = Goods::create($request->all());
        return response()->json($goods);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $goods = Goods::find($id);
        return response()->json($goods);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Goods $goods)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Goods $goods)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $goods = Goods::find($id);
        $goods->delete();
        return response()->json(null, 204);
    }

    public function getRemoved() {

        $goods = Goods::onlyTrashed()->with('shipment', 'client', 'receiver')->paginate(10);
        return response()->json($goods);
    }

    public function restore($id) {
        $goods = Goods::withTrashed()->find($id);
        $goods->restore();
        return response()->json(['message' => 'Goods restored successfully']);
    }

    public function totalGoods() {
        $total = Goods::count();
        return response()->json(['total' => $total]);
    }

    public function weight() {

        $total = Goods::sum('weight');
        return response()->json(['total' => $total]);
    }
}
