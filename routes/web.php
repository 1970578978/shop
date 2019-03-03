<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home')->middleware('verified');

Route::get('/register', 'Home\AuthController@register')->name('register');
Route::get('/login', 'Home\AuthController@login')->name('login');
Route::get('forgot-password', 'Home\AuthController@forgot_password')->name('forgotpassword');
Route::get('resent-password', 'Home\AuthController@reset_password')->name('resetpassword');