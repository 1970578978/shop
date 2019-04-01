<?php

namespace App\Listeners;

use Laravel\Passport\Events\RefreshTokenCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;//使用队列执行事件和监听 
use Illuminate\Support\Facades\DB;//使用数据构造器删除令牌

class PruneOldTokens implements ShouldQueue
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
     * @param  RefreshTokenCreated  $event更新令牌的事件
     * @return void
     */
    public function handle(RefreshTokenCreated $event)
    {
        //删除以前的更新令牌
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', '<>', $event->accessTokenId)
            ->where('revoked', '=', 0)
            ->delete();
    }
}
