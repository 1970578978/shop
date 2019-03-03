<?php

namespace App\Http\Controllers\Api\auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Models\auth\PasswordResets;
use Illuminate\Support\Facades\Crypt;//加解密
use Illuminate\Contracts\Encryption\DecryptException;//加解密异常
use Validator;//返回错误
use App\Jobs\SendEmail;//使用队列

/**
 * 忘记密码控制器
 * 
 */
class ForgotPasswordController extends Controller
{
    /**
     * 给申请忘记密码的邮箱发送链接
     * 
     */
    public function passwordEmail(Request $request){
        $email = $request->input('email');
        $user = User::where('email', $email)->first();
        if(empty($user)){

            return response()->json(['error' => '该邮箱还没有被注册'], config('app.http_code.failed'));
        }

        $token = time().str_random(10).$email;//token的组成
        $token_crypt = Crypt::encryptString($token);//加密token
        $hash_token = bcrypt($token_crypt);//对加密后的值惊喜hash处理

        $password_resets = PasswordResets::firstOrCreate([//更新或创造原有的token值
            'email' => $email,
        ]);
        $password_resets->token = $hash_token;
        $password_resets->save();

        $emailMessage['email'] = $email;
        $emailMessage['name'] = $user->name;
        $emailMessage['url'] = Route('resetpassword').'?token='.$token_crypt;
        $emailMessage['operating'] = '重置密码';

        //组合队列需要的数据
        $emailData['email'] = $email;
        $emailData['subject'] = '重置密码';
        $emailData['view'] = 'index.email';
        $emailData['data'] = $$emailMessage;
        SendEmail::dispatch($emailData)->onConnection('database');    //分发队列任务

        return response()->json(['message' => '重置邮件已发送'], config('app.http_code.succes'));

    }

    /**
     * 验证邮箱并进行密码重置
     * 
     */
    public function resetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'token' => ['required'],
            'password' => ['required', 'min:6', 'regex:/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)[A-Za-z0-9-_!@#$%^&*()]+$/u'],
            'c_password' => 'required|same:password',
        ], [
            'token.required' => '重置连接异常',
            'password.required' => '请填写密码',
            'password.regex' => '密码必须是英文、数字、下划线等特殊字符至少两种组合',
            'password.min' => '密码必须包含6位',
            'c_password.required' => '必须填写确认密码',
            'c_password.same' => '两次密码不一致',
        ]);

        if ($validator->fails()) {  //验证失败返回错误信息

            return response()->json(['error'=>$validator->errors()], config('app.http_code.failed'));           
        }else{
            $input = $request->all();
        }

        try{//避免用户修改参数
            $token = Crypt::decryptString($input['token']);
        } catch (DecryptException $e) {

            return response()->json(['error' => '重置连接异常'], config('app.http_code.failed'));
        }

        $time = (int)str_limit($token, 10, '') + config('app.email_message.resent_time')*60;
        if(time() > $time){ //如果超过有效期

            return response()->json(['error' => '连接已失效'], config('app.http_code.failed'));
        }

        $email = substr($token, 20);
        //找出对应的用户
        $user = User::where('email', $email)->first();
        $user->password = bcrypt($input['password']);
        $user->save();

        return response()->json(['message' => '修改成功'], config('app.http_code.succes'));
    }
}
