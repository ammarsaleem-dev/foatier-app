<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage')?? 10;
        $permissions = Permission::orderBy('created_at','desc')->paginate($perPage);
        return Inertia::render('Permission/Browse', [
            'permissions' => $permissions
        ]);
    }

    public function create()
    {
        return Inertia::render('Permission/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:permissions,name']);
        Permission::create($request->only('name'));
        return redirect()->route('permission.index')->with('success', 'Permission created successfully.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return redirect()->route('permission.index')->with('success', 'Permission deleted successfully.');
    }
}
