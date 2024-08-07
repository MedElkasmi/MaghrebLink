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
            'quantity' => 'required|integer',
            'description' => 'required|string|max:255',
            'weight' => 'required|numeric',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'storage_location' => 'required|string|max:255',
            'qr_code' => 'nullable|string|max:255',
        ];
    }
}
