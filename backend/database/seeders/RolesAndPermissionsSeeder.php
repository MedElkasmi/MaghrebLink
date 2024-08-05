<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creating roles
        $roleAdmin = Role::create(['name' => 'Admin']);
        $roleClient = Role::create(['name' => 'Client']);
        $roleDriver = Role::create(['name' => 'Driver']);

        // Creating permissions
        $permissionViewDashboard = Permission::create(['name' => 'view_dashboard']);
        $permissionEditProfile = Permission::create(['name' => 'edit_profile']);

        // Assigning permissions to roles
        $roleAdmin->givePermissionTo($permissionViewDashboard);
        $roleAdmin->givePermissionTo($permissionEditProfile);
        $roleClient->givePermissionTo($permissionEditProfile);
    }
}
