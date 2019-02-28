<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Model;

class PasswordResets extends Model
{
    //设置白名单，可以批量复制
    protected $fillable = ['email', 'token'];

    //设置主键
    protected $primaryKey = 'email';

    //主键不是自增的
    public $incrementing = false;

    //主键不是整型
    protected $keyType = 'string';
}
