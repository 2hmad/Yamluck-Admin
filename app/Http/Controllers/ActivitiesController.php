<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivitiesController extends Controller
{
    public function index()
    {
        return DB::table('activities')->orderBy('id', 'DESC')->get();
    }
}
