<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoodsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'shipment_id' => 'required|exists:shipments,id',
            'client_id' => 'required|exists:clients,id',
            'receiver_id' => 'required|exists:drivers,id',
            'weight' => 'required|numeric',
            'storage_location' => 'required|string|max:255',
        ];
    }
}
