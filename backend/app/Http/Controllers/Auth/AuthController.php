<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\TransientToken;


class AuthController extends Controller
{
    // app/Http/Controllers/Auth/AuthController.php
public function register(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:8',
        'is_admin'=> 'boolean'
        
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'is_admin' => $validated['is_admin'] ?? false
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user'=> $user
    ]);
}

public function login(Request $request)
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'message' => 'Invalid login details'
        ], 401);
    }

    $user = User::where('email', $request['email'])->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user'=> $user
    ]);
}

// public function logout(Request $request)
// {
//     $request->user()->currentAccessToken()->delete();
//     return response()->json(['message' => 'Logged out']);
// }



public function logout(Request $request)
{
    $token = $request->user()->currentAccessToken();

    // Only delete if it's not a TransientToken
    if ($token && !($token instanceof TransientToken)) {
        $token->delete();
    }

    return response()->json(['message' => 'Logged out successfully.']);
}

public function me(Request $request)
{
    return response()->json($request->user());
}


}
