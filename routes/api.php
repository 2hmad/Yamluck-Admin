<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ActivitiesController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('users', [UsersController::class, 'index']);
Route::get('activities', [ActivitiesController::class, 'index']);
Route::get('categories', [CategoriesController::class, 'index']);
Route::post('categories/delete', [CategoriesController::class, 'delete']);
Route::post('subCat', [CategoriesController::class, 'getSubCat']);
Route::post('subCat/delete', [CategoriesController::class, 'deleteSubCat']);
Route::post('subSubCat', [CategoriesController::class, 'getSubSubCat']);
Route::post('subSubCat/delete', [CategoriesController::class, 'deleteSubSubCat']);
