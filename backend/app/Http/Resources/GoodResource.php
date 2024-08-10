<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GoodResource extends JsonResource
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
            'product_code' => $this->product_code,
            'shipment' => new ShipmentResource($this->whenLoaded('shipment')),
            'client' => new ClientResource($this->whenLoaded('client')),
            'receiver' => new ReceiverResource($this->whenLoaded('receiver')),
            'weight' => $this->weight,
            'storage_location' => $this->storage_location,
            'created_at' => $this->created_at,
        ];
    }
}
