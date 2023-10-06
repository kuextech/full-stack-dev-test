<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


use App\Http\Controllers\API\TodoController;

Route::get('/todos',[TodoController::class,'index']);
Route::post('/todos',[TodoController::class,'store']);
Route::put('/todos/{id}',[TodoController::class,'update']);
