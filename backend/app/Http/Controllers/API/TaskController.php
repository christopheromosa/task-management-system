<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

use App\Mail\TaskAssigned;
use Illuminate\Support\Facades\Mail;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    if (auth()->user()->is_admin) {
        return Task::with(['assigned_to', 'assigned_by'])->get();
    }
    return auth()->user()->assignedTasks()->with('assigned_by')->get();
}

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'assigned_to' => 'required|exists:users,id',
        'deadline' => 'required|date',
    ]);

    $task = Task::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'assigned_to' => $validated['assigned_to'],
        'assigned_by' => auth()->id(),
        'deadline' => $validated['deadline'],
        'status' => 'Pending',
    ]);

    // Send email notification
    $user = User::find($validated['assigned_to']);
    Mail::to($user->email)->send(new TaskAssigned($task,$user));

    return response()->json($task, 201);
}

public function show($id)
{
    $task = Task::with(['assigned_by','assigned_to'])->findOrFail($id);
    return response()->json($task);
}

public function updateStatus(Request $request, Task $task)
{
    if ($task->assigned_to !== auth()->id()) {
        abort(403, 'Unauthorized action.');
    }

    $validated = $request->validate([
        'status' => 'required|in:Pending,In Progress,Completed',
    ]);

    $task->update(['status' => $validated['status']]);

    return response()->json($task);
}

public function userTasks($userId)
{
    // Check if user exists
    $user = \App\Models\User::findOrFail($userId);

    // Get tasks assigned to this user
    $tasks = Task::with(['assigned_by'])->where('assigned_to', $userId)->get();

    return response()->json([
        'success' => true,
        'data' => $tasks
    ]);
}


}
