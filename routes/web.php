<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Manage Locale en , ar
Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'ar'])) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
})->name('lang.switch');


Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'showRegister']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {

    Route::get('/', fn() => Inertia::render('Welcome'));
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::delete('category/bulk-delete/{ids}', [CategoryController::class, 'bulkDelete'])->name('category.bulkDelete');
    Route::resource('category', CategoryController::class);
    Route::delete('brand/bulk-delete/{ids}', [BrandController::class, 'bulkDelete'])->name('brand.bulkDelete');
    Route::resource('brand', BrandController::class);
    Route::delete('product/bulk-delete/{ids}', [ProductController::class, 'bulkDelete'])->name('product.bulkDelete');
    Route::resource('product', ProductController::class);
    Route::delete('role/bulk-delete/{ids}', [RoleController::class, 'bulkDelete'])->name('role.bulkDelete');
    Route::resource('role', RoleController::class);
    Route::delete('permission/bulk-delete/{ids}', [PermissionController::class, 'bulkDelete'])->name('permission.bulkDelete');
    Route::resource('permission', PermissionController::class);
    Route::delete('user/bulk-delete/{ids}', [UserController::class, 'bulkDelete'])->name('user.bulkDelete');
    Route::resource('user', UserController::class);
});
