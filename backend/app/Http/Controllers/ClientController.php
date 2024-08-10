<?php

namespace App\Http\Controllers;

use App\Services\ClientService;
use App\Http\Requests\ClientRequest;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\ClientResource;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    protected $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    public function index(Request $request): JsonResponse
    {
        $clients = $this->clientService->getClients($request->all());
        return response()->json([
            'data' => ClientResource::collection($clients),
            'meta' => [
                'current_page' => $clients->currentPage(),
                'last_page' => $clients->lastPage(),
                'per_page' => $clients->perPage(),
                'total' => $clients->total(),
            ],
        ]);
    }

    public function store(ClientRequest $request): JsonResponse
    {
        $client = $this->clientService->createClient($request->validated());
        return response()->json(new ClientResource($client), 201);
    }

    public function show(int $id): JsonResponse
    {
        $client = $this->clientService->getClientById($id);
        return response()->json(new ClientResource($client));
    }

    public function update(ClientRequest $request, int $id): JsonResponse
    {
        $client = $this->clientService->updateClient($id, $request->validated());
        return response()->json(new ClientResource($client));
    }

    public function destroy(int $id): JsonResponse
    {
        $this->clientService->deleteClient($id);
        return response()->json(['message' => 'Client deleted successfully']);
    }

    public function restore(int $id): JsonResponse
    {
        $this->clientService->restoreClient($id);
        return response()->json(['message' => 'Client restored successfully']);
    }

    public function forceDelete(int $id): JsonResponse
    {
        $this->clientService->forceDeleteClient($id);
        return response()->json(['message' => 'Client permanently deleted successfully']);
    }

    public function getRemoved(): JsonResponse
    {
        $clients = $this->clientService->getRemovedClients();
        return response()->json([
            'data' => ClientResource::collection($clients),
            'meta' => [
                'current_page' => $clients->currentPage(),
                'last_page' => $clients->lastPage(),
                'per_page' => $clients->perPage(),
                'total' => $clients->total(),
            ]
        ]);
    }

    public function totalClients(): JsonResponse
    {
        $totalClients = $this->clientService->countClients();
        return response()->json(['total' => $totalClients]);
    }

    public function search(Request $request)
    {
        // return Client::where('fullname', 'like', "%{$search}%")
        // ->orWhere('whatsapp', 'like', "%{$search}%")
        // ->orWhere('country', 'like', "%{$search}%")
        // ->orWhere('city', 'like', "%{$search}%")
        // ->orWhere('address', 'like', "%{$search}%")
        // ->paginate(10);

        $query = $request->input('query');
        $clients = Client::where('fullname', 'like', "%{$query}%")->get();

        return response()->json($clients);
    }
}
