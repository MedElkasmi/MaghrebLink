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
            'origin' => $this->origin,
            'destination' => $this->destination,
            'created_at' => $this->created_at->todateTimeString(),
            'updated_at' => $this->updated_at->todateTimeString(),
        ];
    }
}
