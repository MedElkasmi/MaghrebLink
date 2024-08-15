<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tracking_number' => $this->tracking_number,
            'driver_id' => new DriverResource($this->whenLoaded('driver')),
            'shipment_date' => $this->shipment_date,
            'arrived_date' => $this->arrived_date,
            'status' => $this->status,
            'created_at' => $this->created_at->todateTimeString(),
            'updated_at' => $this->updated_at->todateTimeString(),
        ];
    }
}
