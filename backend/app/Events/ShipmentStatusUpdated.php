<?php

namespace App\Events;

use App\Models\Shipment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class ShipmentStatusUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $shipment;

    /**
     * Create a new event instance.
     */
    public function __construct(Shipment $shipment)
    {
        //
        $this->shipment = $shipment;
        Log::info('ShipmentStatusUpdated event triggered', ['shipment_id' => $shipment->id, 'status' => $shipment->status]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
