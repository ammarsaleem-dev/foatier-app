<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::delete('category/bulk-delete/{ids}', [CategoryController::class, 'bulkDelete'])->name('category.bulkDelete');
    // ->middleware('auth');
Route::resource('category', CategoryController::class);
