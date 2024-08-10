<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {

        $validatedData = $request->validate([
            'fullname' => 'required|string|max:50',
            'username' => 'required|string|max:50',
            'password' => 'required|string|min:8',
            'whatsapp' => 'required|string|min:10',
        ]);

        User::create([
            'fullname' => $validatedData['fullname'],
            'username' => $validatedData['username'],
            'password' => Hash::make($validatedData['password']),
            'Whatsapp' => $validatedData['whatsapp'],
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    
    }

    public function login(Request $request) {

        $credentials = $request->only('username', 'password'); 

        try {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('token')->plainTextToken;
                $roles = $user->getRoleNames(); // Retrieve the roles of the user
                return response()->json(['token' => $token, 'roles' => $roles], 200);
            } else {
                return response()->json(['error' => 'Unauthorized from login code'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function logout(Request $request) {

        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

}
