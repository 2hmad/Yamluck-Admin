<?php

namespace App\Http\Controllers;

use App\Models\Offers;
use App\Models\Subscribe;
use Illuminate\Http\Request;

class OffersController extends Controller
{
    public function index()
    {
        return Offers::get();
    }
    public function getSubs(Request $request)
    {
        return Subscribe::where('product_id', $request->product_id)->with('user')->get();
    }
}
