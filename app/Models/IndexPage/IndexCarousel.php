<?php

namespace App\Models\IndexPage;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;  //支持软删除

class IndexCarousel extends Model
{
    use SoftDeletes;  //软删除
    
    //设置白名单，可以批量复制
    protected $fillable = ['img_local', 'img_title', 'img_url', 'sort'];

}
