<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TaskController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected route
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
        // User routes (admin only)
    Route::middleware('admin')->group(function () {
        Route::apiResource('/users', UserController::class);
    });
    
    // Task routes
    Route::apiResource('/tasks', TaskController::class);
    // Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus']);
    Route::match(['put', 'patch'], '/tasks/{task}/status', [TaskController::class, 'updateStatus']);

    
    // User-specific routes
    Route::get('/user/{userId}/tasks', [TaskController::class, 'userTasks']);
});