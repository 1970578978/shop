<?php

namespace App\Http\Middleware\auth;

use Closure;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //$response = $next($request);//在请求后执行

        $token = $request->cookie('token');
        
        if(empty($token) && strlen($token) != mb_strlen($token) && strlen($token) < 1000){
            return redirect()->route('login');
        }

        return $next($request);
    }
}
