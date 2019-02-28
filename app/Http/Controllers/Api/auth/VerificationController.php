<?php

namespace App\Http\Controllers\Api\auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail; //发送邮件类

class VerificationController extends Controller
{
    //成功代码
    public $successStatus = 200;

    /**
     * 验证邮箱接口
     * 
     * 需要用户的token值，并传入email_token参数
     */
    public function verificationEmail(Request $request){
        $user = Auth::user();
        if($request->input('email_token') != $user->email_token){
            return response()->json(['error' => '邮箱验证失败'], config('app.http_code.failed'));
        }

        if(!empty($user->email_verified_at)){
            return response()->json(['error' => '邮箱已验证，无须重复验证'], config('app.http_code.succes'));
        }
        $dt = new \DateTime();
        $user->email_verified_at = $dt;
        $user->save();
        return response()->json(['message' => '邮箱验证成功'], config('app.http_code.succes'));
    }

    /**
     * 重发验证邮箱邮件
     */
    public function resendEmail(Request $request){
        $user = Auth::user();
        $success['name'] = $user->name;
        $success['token'] = str_after($request->header('Authorization'), 'Bearer ');
        $success['email_token'] = $user->email_token;
        
        $to = $user->email;
        $subject = '验证邮箱';
        Mail::send(
            'index.email', 
            ['data' => $success], 
            function ($message) use($to, $subject) { 
                $message->to($to)->subject($subject); 
            }
        );
        return response()->json(['message' => '发送成功'], config('app.http_code.succes'));
    }
}
