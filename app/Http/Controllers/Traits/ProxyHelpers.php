<?php
 
namespace App\Http\Controllers\Traits;
 
use GuzzleHttp\Client;
use App\Exceptions\UnauthorizedException;
use GuzzleHttp\Exception\RequestException;
 
trait ProxyHelpers
{
    public function authenticate()
    {
        $client = new Client();
        try {
            $url = request()->root() . '/oauth/token';
            $params = array_merge(config('passport.proxy'), [
                'username' => request('email'),
                'password' => request('password'),
            ]);
            
            $respond = $client->request('POST', $url, ['form_params' => $params]);
        } catch (RequestException $exception) {

            return ['error' => '请求失败，认证服务器出错'];
            //throw new UnauthorizedException('请求失败，服务器错误');
        }

        if ($respond->getStatusCode() !== 401) {
            return json_decode($respond->getBody()->getContents(), true);
        }

        return ['error' => '账号密码出错'];
        //throw new UnauthorizedException('账号或密码错误');
    }
}


?>