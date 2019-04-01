<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail; //发送邮件类

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * 任务尝试的最大次数
     *
     * @var int
     */
    public $tries = 3;
    /**
     * 发送邮件的参数
     */
    protected $emailData;
    /**
     * Determine the time at which the job should timeout.
     * 基于时间的最大尝试次数
     * 
     * @return \DateTime
     */
    public function retryUntil()
    {
        return now()->addSeconds(5);
    }
    /**
     * Create a new job instance.
     * 创建一个队列任务，可以用来传参数
     *
     * @return void
     */
    public function __construct($emailData)
    {
        //
        $this->emailData['email'] = $emailData['email'];
        $this->emailData['subject'] = $emailData['subject'];
        $this->emailData['view'] = $emailData['view'];
        $this->emailData['data'] = $emailData['data'];
    }

    /**
     * Execute the job.
     * 队列需要执行的方法
     *
     * @return void
     */
    public function handle()
    {
        //发送重置密码邮件
        $to = $this->emailData['email'];
        $subject = $this->emailData['subject'];
        Mail::send(
            $this->emailData['view'],
            ['data' => $this->emailData['data']], 
            function ($message) use($to, $subject) { 
                $message->to($to)->subject($subject); 
            }
        );
    }
}
