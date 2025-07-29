<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

// Route::resource('category', CategoryController::class)->names('category');
Route::resource('category', CategoryController::class);
