<?php

namespace App\Mail;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TaskAssigned extends Mailable
{
    use Queueable, SerializesModels;

    public $task;

    public function __construct(Task $task,$user)
    {
        $this->task = $task;
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('New Task Assigned')
                    ->markdown('emails.task.assigned')
                    ->with(['task' => $this->task,'user'=> $this->user]);
    }
}
