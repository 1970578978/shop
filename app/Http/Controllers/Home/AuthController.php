<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;//加解密
use Illuminate\Contracts\Encryption\DecryptException;//加解密异常

class AuthController extends Controller
{
    //显示注册页面
    public function register(){
        return view('auth.register');
    }

    //显示登录页面
    public function login(){
        return view('auth.login');
    }

    //找回密码控制器
    public function forgot_password(){
        return view('auth.passwords.forgotemail');
    }

    //重设密码页面
    public function reset_password(Request $request){
        $origin_token = $request->token;

        try{//避免用户修改参数
            $token = Crypt::decryptString($origin_token);
        } catch (DecryptException $e) {

            return view('auth.passwords.reset')->with(['error' => '连接已被篡改']);
        }

        $time = (int)str_limit($token, 10, '') + config('app.email_message.resent_time')*60;
        if(time() > $time){ //如果超过有效期

            return view('auth.passwords.reset')->with(['error' => '连接已经失效']);
        }

        $email = substr($token, 20);

        return view('auth.passwords.reset')->with(['email' => $email, 'token' => $origin_token]);
    }

    /**
     * 显示验证邮箱页面
     */
    public function verifi_email(Request $request){
        $data['token'] = $request->access_token;
        $data['email_token'] = $request->email_token;

        return view('auth.verifiemail')->with(['data' => $data]);
    }
}
