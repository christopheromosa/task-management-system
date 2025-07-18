<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller; // <-- Important!

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'position' => 'required|string',
            'status' => 'required|in:active,inactive',
            'is_admin' => 'boolean',
        ]);

        $validated['password'] = Hash::make('00000000'); // default password eight zeros
        $user = User::create($validated);

        return response()->json([
            'data' => $user,
        ], 201);
    }

    public function index()
{
    return User::all();
}

public function show($id)
{
    $user = User::findOrFail($id);
    return response()->json($user);
}

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $validated = $request->validate([
        'name' => 'string|max:255',
        'email' => 'email|unique:users,email,' . $id,
        'position' => 'string',
        'status' => 'in:active,inactive',
        'is_admin' => 'boolean',
    ]);

    $user->update($validated);

    return response()->json($user);
}

public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'User deleted']);
}


}
