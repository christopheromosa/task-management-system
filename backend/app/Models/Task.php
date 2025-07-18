<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'assigned_to',
        'assigned_by',
        'deadline',
        'status',
    ];

public function assigned_to()
{
    return $this->belongsTo(User::class, 'assigned_to');
}

public function assigned_by()
{
    return $this->belongsTo(User::class, 'assigned_by');
}



}
