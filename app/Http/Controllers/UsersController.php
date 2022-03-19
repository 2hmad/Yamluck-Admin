<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return Users::orderBy('id', 'DESC')->get();
    }
    public function getTotalUsers()
    {
        return Users::count();
    }
    public function getActiveUsers()
    {
        return Users::where('verified', 1)->count();
    }
    public function getPendingUsers()
    {
        return Users::where('verified', 0)->count();
    }
}
