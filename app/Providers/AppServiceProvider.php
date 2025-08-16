<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('auth', function () {
            $user = Auth::user();
            return [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'roles' => $user->roles->pluck('name'),
                    'permissions' => $user->roles->flatMap->permissions->pluck('name')->unique(),
                ] : null,
            ];
        });
        // Inertia::share([
        //     'auth' => fn() => [
        //         'user' => Auth::user(),
        //     ],
        // ]);
        Inertia::share('translations', fn() => trans('messages'));
        Inertia::share('locale', fn() => app()->getLocale());
    }
}
