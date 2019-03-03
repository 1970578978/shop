<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\IndexPage\IndexCarousel;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class CarouselMapController extends Controller
{
    //展示轮播图数据
    public function show(){
        // return view('email.verifyeamil');
        // $data = time().str_random(10).'1970578978@qq.com';
        // $datas['encrypted'] = Crypt::encryptString($data);
        try{
            $datas['decrypted'] = Crypt::decryptString($datas['encrypted']);
        } catch (DecryptException $e) {
            return response()->json($datas, config('app.http_code.succes'));
        }
        //$datas['time'] = str_limit($datas['decrypted'], 10, '');
        //$datas['email'] = substr($datas['decrypted'], 20);
        //$datas['bcrypt'] = bcrypt($datas['encrypted']);
        return response()->json($datas, config('app.http_code.succes'));
        //dd(time());
        //return IndexCarousel::where('is_enable', 1)->select('img_local','img_title','img_url')->orderBy('sort', 'asc')->get();
    }
}
