<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\GoodsController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\DeliveryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/logout', [AuthController::class, 'logout']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {

    // Client Routes
    Route::middleware([])->group(function () {

        Route::prefix('/clients')->group(function () {
            Route::post('/add', [ClientController::class, 'store']);
            Route::get('/search', [ClientController::class, 'search']);
            Route::get('/removed', [ClientController::class, 'getRemoved']);
            Route::get('/', [ClientController::class, 'index']);
            Route::get('/total', [ClientController::class, 'totalClients']);
            Route::get('/{id}', [ClientController::class, 'show']);
            Route::put('/{id}', [ClientController::class, 'update']);
            Route::delete('/{id}', [ClientController::class, 'destroy']);
            Route::patch('/{id}/restore', [ClientController::class, 'restore']);
            Route::delete('/{id}/force-delete', [ClientController::class, 'forceDelete']);
        });
        // Goods Routes
        Route::prefix('goods')->group(function () {
            Route::get('/search', [GoodsController::class, 'search']);
            Route::get('/removed', [GoodsController::class, 'getRemoved']);
            Route::get('/total', [GoodsController::class, 'totalGoods']);
            Route::get('/weight', [GoodsController::class, 'weight']);
            Route::get('/price', [GoodsController::class, 'price']);
            Route::get('/{id}', [GoodsController::class, 'show']);
            Route::get('/', [GoodsController::class, 'index']);
            Route::post('/store', [GoodsController::class, 'store']);
            Route::put('/{id}', [GoodsController::class, 'update']);
            Route::delete('/{id}', [GoodsController::class, 'destroy']);
            Route::patch('/{id}/restore', [GoodsController::class, 'restore']);
            Route::delete('/{id}/force-delete', [GoodsController::class, 'forceDelete']);
        });
        // Shipment Routes
        Route::prefix('shipments')->group(function () {
            Route::get('/active',[ShipmentController::class, 'active']);
            Route::put('/finish/{id}',[ShipmentController::class, 'finished']);
            Route::get('/search', [ShipmentController::class, 'search']);
            Route::get('/', [ShipmentController::class, 'index']);
            Route::get('/removed', [ShipmentController::class, 'getRemoved']);
            Route::get('/total', [ShipmentController::class, 'totalShipments']);
            Route::get('/overview', [ShipmentController::class, 'overview']);
            Route::get('/qr/{qrCode}', [ShipmentController::class, 'getShipmentByQrCode']);
            Route::post('/store', [ShipmentController::class, 'store']);
            Route::get('/{tracking_number}', [ShipmentController::class, 'show']);
            Route::put('/{id}', [ShipmentController::class, 'update']);
            Route::delete('/{id}', [ShipmentController::class, 'destroy']);
            Route::patch('/{id}/restore', [ShipmentController::class, 'restore']);
            Route::delete('/{id}/force-delete', [ShipmentController::class, 'forceDelete']);
            Route::get('/{id}/delivered-shipments-count', [ShipmentController::class, 'getDeliveredShipmentsCount']);
            Route::get('/{id}/pending', [ShipmentController::class, 'getPendingShipments']);

        });
        // Driver Routes
        Route::prefix('drivers')->group(function () {
            Route::post('/new', [DriverController::class, 'store']);
            Route::get('/{id}/weight', [DriverController::class, 'getTotalGoodsWeight']);
            Route::get('/search', [DriverController::class, 'search']);
            Route::get('/{id}', [DriverController::class, 'show']);
            Route::get('/', [DriverController::class, 'index']);
            Route::delete('/{id}', [DriverController::class, 'destroy']);
        });
        // Tracking Routes
        Route::prefix('tracking')->group(function () {
            Route::post('/update', [TrackingController::class, 'updateTracking']);
            Route::get('/{tracking_number}', [TrackingController::class, 'getTracking']);
            Route::post('/save', [TrackingController::class, 'store']);
        });
        // Delivery Routes
        Route::prefix('deliveries')->group(function () {
            Route::get('/search', [DeliveryController::class, 'search']);
            Route::get('/total', [DeliveryController::class, 'totalDeliveries']);
            Route::post('/deliveries', [DeliveryController::class, 'store']);
            Route::get('/', [DeliveryController::class, 'index']);
            Route::put('/deliveries/{id}', [DeliveryController::class, 'update']);
            Route::get('/deliveries/{id}', [DeliveryController::class, 'show']);
        });
    });

});
