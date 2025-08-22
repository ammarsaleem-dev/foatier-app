<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('can:viewAny,App\Models\User', only: ['index']),
            new Middleware('can:create,App\Models\User', only: ['create', 'store']),
            new Middleware('can:view,user', only: ['show']),
            new Middleware('can:update,user', only: ['edit', 'update']),
            new Middleware('can:delete,user', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage') ?? 10;
        $users = User::orderBy('created_at', 'desc')->paginate($perPage);
        return inertia('User/Browse', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return inertia('User/Create', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'username' => 'required|string|min:3|max:50|unique:users,username',
            'password' => 'required|string|min:6|confirmed', // confirmed = matches password_confirmation
            'role_id' => 'required|exists:roles,id',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
        ]);
        $user->roles()->attach($validated['role_id']);

        return redirect()->route('user.index')->with(
            'flash',
            [
                'type'    => 'success',
                'message' => 'User created successfully!',
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user = $user->load('roles'); // Load roles for the user
        return inertia('User/Show', [
            'user' => $user, // Load roles for the user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles'); // Load roles for the user
        $roles = Role::all();
        return inertia('User/Update', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'username' => 'required|string|min:3|max:50|unique:users,username,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed', // nullable = optional  
            'role_id' => 'nullable|exists:roles,id', // Ensure role_id exists in roles table 
        ]);

        $user->name = $validated['name'];
        $user->username = $validated['username'];
        $user->roles()->sync($request->input('role_id', [])); // Sync roles, allowing empty array to remove all roles 
        
        // Only update password if provided
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();
        return redirect()->route('user.index')->with(
            'flash',
            [
                'type'    => 'success',
                'message' => 'User updated successfully!',
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
