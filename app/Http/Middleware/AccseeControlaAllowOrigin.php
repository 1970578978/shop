<?php

namespace App\Http\Middleware;

use Closure;

class AccseeControlaAllowOrigin
{
    /**
     * 
     * 允许跨域请求中间件.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
		$response->header('Access-Control-Allow-Origin', '*');
        return $response;
    }
}
