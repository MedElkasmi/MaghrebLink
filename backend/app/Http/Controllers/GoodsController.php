<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoodsRequest;
use App\Http\Resources\GoodResource;
use App\Services\GoodService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoodsController extends Controller
{
    protected $goodService;

    public function __construct(GoodService $goodService)
    {
        $this->goodService = $goodService;
    }

    public function index(Request $request): JsonResponse
    {
        $goods = $this->goodService->getGoods($request->all());
        return response()->json([
            'data' => GoodResource::collection($goods),
            'meta' => [
                'current_page' => $goods->currentPage(),
                'last_page' => $goods->lastPage(),
                'per_page' => $goods->perPage(),
                'total' => $goods->total(),
            ]
        ]);
    }

    public function store(GoodsRequest $request): JsonResponse
    {
        $goods = $this->goodService->createGood($request->validated());
        return response()->json(new GoodResource($goods), 201);
    }
    public function show($id): JsonResponse
    {
        $goods = $this->goodService->getGoodById($id);
        return response()->json(new GoodResource($goods));
    }

    public function update(GoodsRequest $request, $id): JsonResponse
    {
        $goods = $this->goodService->updateGood($id, $request->validated());
        return response()->json(new GoodResource($goods));
    }

    public function destroy($id): JsonResponse
    {
        $this->goodService->deleteGood($id);
        return response()->json(['message' => 'Goods deleted successfully']);
    }

    public function getRemoved(Request $request): JsonResponse
    {
        $goods = $this->goodService->getRemoved($request->all());
        return response()->json([
            'data' => GoodResource::collection($goods),
            'meta' => [
                'current_page' => $goods->currentPage(),
                'last_page' => $goods->lastPage(),
                'per_page' => $goods->perPage(),
                'total' => $goods->total(),
            ]
        ]);
    }

    public function restore($id): JsonResponse
    {
        $this->goodService->restoreGood($id);
        return response()->json(['message' => 'Goods restored successfully']);
    }

    public function forceDelete($id): JsonResponse
    {
        $this->goodService->forceDeleteGood($id);
        return response()->json(['message' => 'Goods permanently deleted successfully']);
    }

    public function totalGoods(): JsonResponse
    {
        $total = $this->goodService->getTotalGoods();
        return response()->json(['total' => $total]);
    }

    public function weight(): JsonResponse
    {
        $totalWeight = $this->goodService->getTotalWeight();
        return response()->json(['total' => $totalWeight]);
    }

    public function price() : JsonResponse
    {
        $totalPrice = $this->goodService->getTotalPrice();
        return response()->json(['total' => $totalPrice]);
    }
}
