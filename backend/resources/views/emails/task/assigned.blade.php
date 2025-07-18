<!-- resources/views/emails/task/assigned.blade.php -->

@component('mail::message')
# New Task Assigned

You have been assigned a new task by {{ $user->name }}.

**Title:** {{ $task->title }}

**Description:** {{ $task->description }}

**Deadline:** {{ \Carbon\Carbon::parse($task->deadline)->toDayDateTimeString() }}

@component('mail::button', ['url' => 'http://localhost:5173/user/tasks'])
View Task
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
