<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\IndexPage\IndexCarousel;

class CarouselMapController extends Controller
{
    //展示轮播图数据
    public function show(){
        return IndexCarousel::where('is_enable', 1)->select('img_local','img_title','img_url')->orderBy('sort', 'asc')->get();
    }
}
