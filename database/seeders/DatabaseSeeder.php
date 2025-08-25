<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // use this command
        // php artisan migrate:fresh --seed

        // You can call other seeders here
        // Category::factory(50)->create();
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
