<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoicesController extends Controller
{
    public function index()
    {
        return DB::table('payments_invoices')->orderBy('id', 'DESC')->get();
    }
}
