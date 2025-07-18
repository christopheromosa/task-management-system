<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
->withMiddleware(function (Middleware $middleware): void {
    // Global middleware
    $middleware->append([
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    ]);

    // Route middleware
    $middleware->alias([
        'admin' => \App\Http\Middleware\AdminMiddleware::class, // <-- your custom middleware
    ]);
})

    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
