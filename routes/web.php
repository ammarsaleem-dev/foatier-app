<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'showRegister']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {

Route::get('/', fn ()=> Inertia::render('Dashboard'));
Route::delete('category/bulk-delete/{ids}', [CategoryController::class, 'bulkDelete'])->name('category.bulkDelete');   
Route::resource('category', CategoryController::class);

});
