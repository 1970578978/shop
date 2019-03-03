<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <base target="_blank" href="../">
    <style>
    .md-text-setting, .content-body p{font-size: .875rem; letter-spacing: .2px; font-family: "Roboto", "RobotoDraft", "Helvetica", "Arial", "sans-serif";}
    .clear-fix{clear: both;}
    .mall-email-info{width: 100%; height: auto; background-color: none; padding-top: 45px}
    .mall-email-info .info-title{background-color: #f5f5f5; width: 450px; margin: 0 auto; background-color: none}
    .mall-email-info .info-title .info-left{width: 40px; height: 100%; float: left; background: none}
    .mall-email-info .info-title .info-left img{margin: 15px auto; margin-right: 0; display: block;}
    .mall-email-info .info-title .info-right{width: 410px; height: 100%; float: left; background: none}
    .mall-email-info .info-title p{text-align: left; font-size: 15px; line-height: 28px; margin: 0; padding: 15px 10px}
    .mall-email-content{padding-top: 10px}
    .content-body{width: 410px; min-height: 180px; background-color: white; margin: 0 auto; padding: 20px 20px; border-radius: 8px; border: 1px solid #dadce0}
    .content-body .logo-header{width: 100%; padding-top: 20px}
    .content-body p{font-size: 15px; line-height: 28px; color: #757575}
    .logo-header img{display: block; margin: 0 auto;}
    .email-title{font-size: 24px; line-height: 32px; text-align: center; padding-top: 25px}
    .email-user-id{text-align: center; line-height: 32px; color: #757575; padding: 5px 0 20px; border-bottom: 1px solid #dadce0}
    .btn-next{width: 88px; border-radius: 4px; background-color: #1a73e8; cursor: pointer; outline: none; padding: 9px 0; text-decoration: none; display: block; transition: all 200ms; -webkit-transition: all 200ms; -o-transition: all 200ms; -moz-transition: all 200ms;}
    .btn-next span{font-weight: 500; font-size: 15px; color: #fff; letter-spacing: .25px; text-align: center; display: block;}
    .btn-next:hover, .btn-next:focus{background: #287ae6; -webkit-box-shadow: 0 1px 1px 0 rgba(66,133,244,0.45), 0 1px 3px 1px rgba(66,133,244,0.3); box-shadow: 0 1px 1px 0 rgba(66,133,244,0.45), 0 1px 3px 1px rgba(66,133,244,0.3);}
    .content-email-footer p{text-align: center; color: #757575}
    input[type="url"]{width: 100%; display: block; outline: none; height: 38px; box-sizing: border-box; border: 1px solid #dadce0; border-radius: 4px; position: relative; transition-property: border-color; padding: 7px 11px; font-size: 14px; margin-top: 10px; color: #202124; transition: all 200ms; -webkit-transition: all 200ms; -o-transition: all 200ms; -moz-transition: all 200ms;}
    input[type="url"]:focus{border: 2px solid #1a73e8;}
    </style>
</head>
<body style="margin: 0">
    <div class="mall-email-info">
        <div class="info-title">
            <div class="info-left" >
                <img src="{{ asset('img/drafts.svg') }}">
            </div>
            <div class="info-right">
                <p class="md-text-setting">您的 {{ config('app.name') }} 账户 <b>{{ $data['email'] }}</b> 由 {{ $data['email'] }}所注册并关联。<br>如果不是您的操作，您可以放心地忽略这封电子邮件。</p>
            </div>
            <div class="clear-fix"></div>
        </div>
    </div>
    <div class="mall-email-content">
        <div class="content-body">
            <div class="logo-header">
                <img src="{{ asset('mall.svg') }}" alt="">
            </div>
            <div class="email-title md-text-setting">{{ $data['operating'] }}</div>
            <div class="email-user-id md-text-setting">{{ $data['email'] }}</div>
            <p><strong style="color: #000">您好：{{ $data['name'] }}</strong></p>
            <p>{{ $data['operating'] == '重置密码' ? config('app.email_message.resent_message') : config('app.email_message.verifi_message')}}</p>
            <a class="btn-next" href="{{ $data['url'] }}"><span>{{ $data['operating'] }}</span></a>
            <p>链接有效时间为 {{ $data['operating'] == '重置密码' ? config('app.email_message.resent_time') : config('app.email_message.verifi_time')}} 分钟。</p>
            <p><strong style="color: #000">致敬</strong></p>
            <p><em>{{ config('app.name') }}</em></p>
            <div class="email-user-id" style="padding: 0"></div>
            <p>如果您点击「{{ $data['operating'] }}」按钮出现问题，请复制下方链接到浏览器中开启：
                <input type="url" value="{{ $data['url'] }}">
            </p>
        </div>
    </div>
    <div class="content-email-footer">
        <p class="md-text-setting">{{ config('app,page.copyright') }}</p>
    </div>
</body>
</html>

            <!-- <p>如果您点击「{{ $data['operating'] }}」按钮出现问题，请点击或复制下方链接到浏览器中开启：<a href="">{{ $data['url'] }}</a></p>
        </div>
    </div>
    <div class="content-email-footer">
        <p class="md-text-setting">{{ config('app,page.copyright') }}</p>
    </div>
</body>

</html> -->
