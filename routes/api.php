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

//添加passport路由
Route::post('login', 'Api\PassportController@login')->middleware('cors');//允许跨域
Route::post('register', 'Api\PassportController@register')->middleware('cors');//允许跨域
//重置密码
Route::post('forgot-password', 'Api\auth\ForgotPasswordController@passwordEmail')->middleware('cors');//允许跨域
Route::post('resent-password', 'Api\auth\ForgotPasswordController@resetPassword')->middleware('cors');//允许跨域

//必须登录的路由
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('get-details', 'Api\PassportController@getDetails')->middleware('cors');//允许跨域
    Route::post('confirm', 'Api\auth\VerificationController@verificationEmail')->middleware('cors');//允许跨域
    Route::post('resend-email', 'Api\auth\VerificationController@resendEmail')->middleware('cors');//允许跨域
    
});
