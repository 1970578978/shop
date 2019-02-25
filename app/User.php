<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
//引入passport的类
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable, \Illuminate\Auth\MustVerifyEmail, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token',
    ];

    /**
     * 重写重置密码验证邮箱内容
     * @param $token 未知
     */
    public function sendPasswordResetNotification($token)
    {
        \Illuminate\Auth\Notifications\ResetPassword::toMailUsing(function ($notifiable, $token) {
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('重置密码')
                ->line('您收到此电子邮件是因为我们收到了您帐户的密码重置请求。')
                ->action('重设密码', url(config('app.url').route('password.reset', $token, false)))
                ->line('有效时间'.config('auth.passwords.users.expire').'分钟。')
                ->line('如果您未请求重置密码，则无需操作。');
        });

        $this->notify(new \Illuminate\Auth\Notifications\ResetPassword($token));
    }

    /**
     * 修改注册邮箱验证内容
     */
    public function sendEmailVerificationNotification()
    {
        \Illuminate\Auth\Notifications\VerifyEmail::toMailUsing(function ($notifiable) {
            $mail = (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('验证邮箱')
                ->line('请点击下面的按钮验证您的邮箱。')
                ->action(
                    '验证邮箱',
                    \Illuminate\Support\Facades\URL::temporarySignedRoute(
                        'verification.verify', now()->addMinutes(60), ['id' => $notifiable->getKey()]
                    )
                )
                ->line('如果您未创建帐户，则无需操作。');
            $mail->viewData['name'] = $notifiable->name; //通过修改 viewData 可以增加数据返回给模板
            return $mail;
        });

        $this->notify(new \Illuminate\Auth\Notifications\VerifyEmail);
    }
}
