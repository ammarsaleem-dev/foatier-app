<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class PermissionController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('can:viewAny,App\Models\Permission', only: ['index']),
            new Middleware('can:create,App\Models\Permission', only: ['create', 'store']),
            new Middleware('can:view,permission', only: ['show']),
            new Middleware('can:update,permission', only: ['edit', 'update']),
            new Middleware('can:delete,permission', only: ['destroy']),
        ];
    }


    public function index(Request $request)
    {
        $perPage = $request->input('perPage') ?? 10;
        $permissions = Permission::orderBy('created_at', 'desc')->paginate($perPage);
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
        return redirect()->route('permission.index')->with(
            'flash',
            [
                'type'    => 'success',
                'message' => 'Permission created successfully!',
            ]
        );
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return redirect()->route('permission.index')->with(
            'flash',
            [
                'type'    => 'success',
                'message' => 'Permission deleted successfully!',
            ]
        );
    }
}
