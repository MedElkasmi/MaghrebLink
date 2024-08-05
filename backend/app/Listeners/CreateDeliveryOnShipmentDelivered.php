<?php

namespace App\Listeners;

use App\Events\ShipmentStatusUpdated;
use App\Models\Delivery;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class CreateDeliveryOnShipmentDelivered
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ShipmentStatusUpdated $event): void
    {
        //
        $shipment = $event->shipment;

        Log::info('Handling ShipmentStatusUpdated event', ['shipment_id' => $shipment->id, 'status' => $shipment->status]);

        if ($shipment->status === 'Delivered') {
            Log::info('Shipment status is Delivered, creating delivery record', ['shipment_id' => $shipment->id]);

            try {
                $delivery = Delivery::create([
                    'shipment_id' => $shipment->id,
                    'received_by' => 'Recipient Name', // Adjust as needed
                    'signature' => 'Recipient Signature', // Adjust as needed
                    'proof_of_delivery' => 'path/to/proof_of_delivery', // Adjust as needed
                ]);

                Log::info('Delivery record created', ['delivery_id' => $delivery->id]);
            } catch (\Exception $e) {
                Log::error('Error creating delivery record', ['message' => $e->getMessage()]);
            }
        } else {
            Log::info('Shipment status is not Delivered', ['shipment_id' => $shipment->id, 'status' => $shipment->status]);
        }
    
    }
}
