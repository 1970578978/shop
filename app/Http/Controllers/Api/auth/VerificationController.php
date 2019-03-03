<?php

namespace App\Http\Controllers\Api\auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendEmail;//使用发送邮件队列

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

        //新增连接时间限制
        $email_token = $request->input('email_token');
        $time = (int)substr($email_token,0,10) + config('app.email_message.verifi_time')*60;
        if(time() > $time){//检测连接还不是失效

            return response()->json(['error' => '连接已失效'], config('app.http_code.failed'));
        }
        $user = Auth::user();
        if($email_token != $user->email_token){//检测token值是不是一样

            return response()->json(['error' => '邮箱验证失败'], config('app.http_code.failed'));
        }

        if(!empty($user->email_verified_at)){//检测是不是已经验证过了

            return response()->json(['error' => '邮箱已验证，无须重复验证'], config('app.http_code.succes'));
        }

        //完成验证，更改字段的值
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
        
        $emailMessage['email'] = $user->email;
        $emailMessage['name'] = $user->name;
        $emailMessage['url'] = Route('verifiEmail').'?access_token='.$success['token'].'&email_token='.$success['email_token'];
        $emailMessage['operating'] = '验证邮箱';
        //使用队列发送邮件
        $emailData['email'] = $user->email;
        $emailData['subject'] = '验证邮箱';
        $emailData['view'] = 'email.verifyemail';
        $emailData['data'] = $emailMessage;
        SendEmail::dispatch($emailData)->onConnection('database');    //分发队列任务
        
        return response()->json(['message' => '发送成功'], config('app.http_code.succes'));
    }
}
