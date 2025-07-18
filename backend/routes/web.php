<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\Auth\AuthController;


Route::middleware('auth:sanctum')->group(function () {
  
    // User routes (admin only)
    Route::middleware('admin')->group(function () {
        Route::apiResource('users', UserController::class);
    });
    
    // Task routes
    Route::apiResource('tasks', TaskController::class);
    Route::put('tasks/{task}/status', [TaskController::class, 'updateStatus']);
    
    // User-specific routes
    Route::get('user/tasks', [TaskController::class, 'userTasks']);
});