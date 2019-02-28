<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Mail; //发送邮件类

class PassportController extends Controller
{
    //
    public $successStatus = 200;


    /**
     * login api
     * 
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $message['token'] = $user->createToken('MyApp')->accessToken;
            $message['name'] =  $user->name;

            return response()->json($message, config('app.http_code.succes'));
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

        if ($validator->fails()) {  //验证失败返回错误信息

            return response()->json(['error'=>$validator->errors()], config('app.http_code.failed'));           
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
        $success['email_token'] = time().$user->id.str_random(40);
        //添加验证邮箱token
        $user->email_token = $success['email_token'];
        $user->save();
        //发送验证邮件
        $to = $input['email'];
        $subject = '验证邮箱';
        Mail::send(
            'index.email', 
            ['data' => $success], 
            function ($message) use($to, $subject) { 
                $message->to($to)->subject($subject); 
            }
        );
        $message['name'] = $success['name'];
        $message['token'] = $success['token'];

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
