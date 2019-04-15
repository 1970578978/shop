<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Jobs\SendEmail;//使用队列发送邮件
use Illuminate\Support\Facades\Mail; //发送邮件类
use App\Http\Controllers\Traits\ProxyHelpers;

class PassportController extends Controller
{
    use ProxyHelpers;

    /**
     * login api
     * 
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $tokenArray = $this->authenticate();
            if(!array_key_exists('error', $tokenArray)){
                $message['token'] = $tokenArray;
                $message['name'] =  $user->name;

                return response()->json($message, config('app.http_code.succes'));
            }
            
            return response()->json(['error'=>'认证服务器认证失败'], config('app.http_code.failed'));
        }else{
            return response()->json(['error'=>'账号密码不正确'], config('app.http_code.failed'));
        }
    }

    /**
     * Register api
     * 
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request){
        //注册表单验证
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,16',
            'email' => 'required|email|max:255|unique:users',
            'password' => ['required', 'min:6', 'regex:/^[A-Za-z0-9-_!@#$%^&*()]+$/u'],
            'c_password' => 'required|same:password',
        ], [
            'name.required' => '用户名不能为空',
            'name.string' => '用户名必须是字符串',
            'name.max' => '用户名不能超过200',
            'email.required' => '邮箱必须填写',
            'email.email' => '邮箱格式不对',
            'email.max' => '仅支持长度小于255的邮箱',
            'email.unique' => '该邮箱已被注册',
            'password.required' => '请填写密码',
            'password.regex' => '密码只支持英文、数字、横杠和下划线',
            'password.min' => '密码必须包含6位',
            'c_password.required' => '必须填写确认密码',
            'c_password.same' => '两次密码不一致',
        ]);
        
        //未通过验证
        if ($validator->fails()) {  //验证失败返回错误信息

            return response()->json(['error'=>$validator->errors()], config('app.http_code.failed'));           
        }

        //用户数据存入数据库
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);    //加密密码
        $user = User::create($input);       //注册用户
        $success['email'] = $input['email'];
        $success['name'] =  $user->name;

        //创建email_token存入用户表中
        $email_token = $user->id.str_random(40);     //组成验证邮箱token
        //添加验证邮箱token
        $user->email_token = $email_token;          //邮箱验证token存入
        $user->save();

        $access_token_array =  $this->authenticate();     //获取密码令牌
        if(!array_key_exists('error', $access_token_array)){     //判断是不是正确获取令牌，获取令牌失败，但你已经正确注册（不发送令牌，不发送验证邮件）
            $access_token = $access_token_array['access_token'];

            $success['url'] = Route('verifiEmail').'?access_token='.$access_token.'&email_token='.time().$email_token;//验证连接
            $success['operating'] = '验证邮箱';
            //使用队列发送验证邮件
            
            $emailData['email'] = $input['email'];
            $emailData['subject'] = '验证邮箱';
            $emailData['view'] = 'email.verifyemail';
            $emailData['data'] = $success;
            SendEmail::dispatch($emailData)->onConnection('database');//使用队列 $success为邮件内容，$email为发送邮件的额参数
            
            //组装返回数据
            $message['token'] = $access_token;      //把令牌返回，组装令牌
            $message['refresh_token'] = $access_token_array['refresh_token'];
            $message['token_type'] = $access_token_array['token_type'];
            $message['expires_in'] = $access_token_array['expires_in'];
        }
        $message['name'] = $success['name'];        //组成注册成功返回值

        return response()->json($message, config('app.http_code.created'));
        
    }

    /**
     * 显示详细信息接口
     * 
     * @return \Illuminate\Http\Response
     */
    public function getDetails(){
        $user = Auth::user();

        return response()->json($user, config('app.http_code.succes'));
    }
}
