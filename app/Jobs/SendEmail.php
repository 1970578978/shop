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
     * Create a new job instance.
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