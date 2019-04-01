<?php

namespace App\Listeners;

use Laravel\Passport\Events\AccessTokenCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;//使用数据构造器删除令牌

class RevokeOldTokens implements ShouldQueue
{
    /**
     * 任务将被推送到的连接名称.
     *
     * @var string|null
     */
    public $connection = 'database';

    /**
     * 任务将被推送到的连接名称.
     *
     * @var string|null
     */
    public $queue = 'default';

    /**
     * 任务被处理之前的延迟时间（秒）
     *
     * @var int
     */
    public $delay = 1;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AccessTokenCreated  $event创建令牌的事件
     * @return void
     */
    public function handle(AccessTokenCreated $event)
    {
        //删除以前的访问令牌
        DB::table('oauth_access_tokens')->where('id', '!=', $event->tokenId)
            ->where('user_id', $event->userId)
            ->where('client_id', $event->clientId)
            ->where('revoked', '=', 0)
            ->delete();
    }
}
