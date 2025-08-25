<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Roles
        $superAdminRole = Role::create(['name' => 'Super Admin']);
        $adminRole = Role::create(['name' => 'Admin']);
        $managerRole = Role::create(['name' => 'Manager']);
        $EmployeeRole = Role::create(['name' => 'Employee']);
        $userRole = Role::create(['name' => 'User']);
        $customerRole = Role::create(['name' => 'Customer']);
        $guestRole = Role::create(['name' => 'Guest']);

        // 2. Create Permissions
        $permissions = [

            'dashboard' => [
                'index',
            ],

            'profile' => [
                'index',
            ],

            'role' => [
                'index',
                'create',
                'update',
                'delete',
                'show',
            ],

            'permission' => [
                'index',
                'create',
                'update',
                'delete',
                'show',
            ],

            'user' => [
                'index',
                'create',
                'update',
                'delete',
                'show',
            ],

            'category' => [
                'index',
                'create',
                'update',
                'delete',
                'show',
            ],

             'brand' => [
                'index',
                'create',
                'update',
                'delete',
                'show',
            ],

              'product' => [
                'index',
                'create',
                'update',
                'delete',
                'show',
            ],

        ];

        foreach ($permissions as $permKey => $permValue) {
            foreach ($permValue as $perm) {

                $fullPermo = $permKey . '.' . $perm;
                $permo = Permission::create(['name' => $fullPermo]);

                //Super Admin gets all permissions
                $superAdminRole->permissions()->attach($permo);

                // Admin gets limited permissions
                if (in_array($fullPermo, ['category.create', 'category.edit'])) {
                    $adminRole->permissions()->attach($permo);
                }

                // Viewer only sees reports
                if ($fullPermo === 'category.show') {
                    $userRole->permissions()->attach($permo);
                }
            }
        }

        // 3. Create Users
        $superAdmin = User::create([
            'name' => 'Ammar Saleem',
            'username' => 'ammar.saleem',
            'password' => Hash::make('Itisalune1')
        ]);
        $superAdmin->roles()->attach($superAdminRole);

        $admin = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('12345678')
        ]);
        $admin->roles()->attach($adminRole);

        $user = User::create([
            'name' => 'User',
            'username' => 'user',
            'password' => Hash::make('12345678')
        ]);
        $user->roles()->attach($userRole);


        $this->command->info("Roles, permissions, and sample users created successfully.");
    }
}
