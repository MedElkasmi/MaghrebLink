<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'fullname' => $this->fullname,
            'whatsapp' => $this->whatsapp,
            'country' => $this->country,
            'city' => $this->city,
            'address' => $this->address,
            'created_at' => $this->created_at->todateTimeString(),
            'updated_at' => $this->updated_at->todateTimeString(),
        ];
    }
}
