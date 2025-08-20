<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class RoleController extends Controller implements HasMiddleware
{    

    public static function middleware()
    {
        return [
            new Middleware('can:viewAny,App\Models\Role', only: ['index']),
            new Middleware('can:create,App\Models\Role', only: ['create', 'store']),
            new Middleware('can:view,role', only: ['show']),
            new Middleware('can:update,role', only: ['edit', 'update']),
            new Middleware('can:delete,role', only: ['destroy']),
        ];
    }


    /**
     * index
     *
     * @param  mixed $request
     * @return void
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage') ?? 10;
        $roles = Role::orderBy('created_at', 'desc')->paginate($perPage);
        return inertia('Role/Browse', ['roles' => $roles]);

    }
    
    /**
     * create
     *
     * @return void
     */
    public function create()
    {
        return Inertia::render('Role/Create');
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:roles,name']);
        Role::create($request->only('name'));
        return redirect()->route('role.index')->with('success', 'Role created successfully.');
    }

    
      
    /**
     * show
     *
     * @param  mixed $role
     * @return void
     */
    public function show(Role $role)
    {
        $role = Role::with('permissions')->findOrFail($role->id);
        return inertia('Role/Show', ['role' => $role]);
    }

    
    /**
     * edit
     *
     * @param  mixed $role
     * @return void
     */
    public function edit(Role $role)
    {

        $permissions = Permission::all();
        return Inertia::render('Role/Update', [
            'role' => $role->load('permissions'),
            'permissions' => $permissions
        ]);
    }
    
    /**
     * update
     *
     * @param  mixed $request
     * @param  mixed $role
     * @return void
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $role->id,
            'permissions' => 'array'
        ]);

        $role->update(['name' => $request->name]);
        $role->permissions()->sync($request->permissions ?? []);

        return redirect()->route('role.index')->with('success', 'Role updated successfully.');
    }
    
    /**
     * destroy
     *
     * @param  mixed $role
     * @return void
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('role.index')->with('success', 'Role deleted successfully.');
    }
}
