<?php

use Illuminate\Http\Request;

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

Route::get('carousel_map', 'Api\CarouselMapController@show');

//添加passport路由登录和注册
Route::post('login', 'Api\PassportController@login');
Route::post('register', 'Api\PassportController@register');
//重置密码
Route::post('forgot-password', 'Api\auth\ForgotPasswordController@passwordEmail');
Route::post('resent-password', 'Api\auth\ForgotPasswordController@resetPassword');

//必须登录的路由
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('get-details', 'Api\PassportController@getDetails');
    Route::post('confirm', 'Api\auth\VerificationController@verificationEmail');
    Route::post('resend-email', 'Api\auth\VerificationController@resendEmail');
    
});
