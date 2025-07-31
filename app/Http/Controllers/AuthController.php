<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  
    /**
     * Show the login page.
     *
     * @return inertia response
     */
    public function showLogin()
    {

        return inertia('Auth/Login');
    }

    public function login(Request $request)
    {
       $credentials = $request->validate([
          'username' => 'required|exists:users,username',
          'password' => 'required|min:6',
      ]);
       if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }
        return back()->withErrors(['username' => 'Invalid credentials']);
    }
    public function showRegister()
    {
        return inertia('Auth/Register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'username' => 'required|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        User::create([
            'name' => $data['name'],
            'email' => 'name@example.com',
            'username' => $data['username'],
            'password' => Hash::make($data['password']),
        ]);

        return redirect('/login');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }

}
