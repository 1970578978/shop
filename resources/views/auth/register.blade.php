<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name', 'Laravel') }}-注册</title>
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/login_reg.css">
</head>
<body>
    <div class="elemall-container register">
        <div class="register-box" style="overflow: unset">
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="logo-header"><img src="./mall.svg" alt="logo-ico" width="30px" height="30px"></div>
                    <div class="md-text-setting flex-center logo-name"><span class="tit register"></span></div>
                    <div class="form-part">
                        <form method="post" onsubmit="">
                            <div class="enter-name trans-all-200 reg">
                                <input class="md-text-setting" type="email" name="enter-name-reg">
                                <div class="place-holder-reg">电子邮件地址</div>
                                <div class="err-words pre"><span class="flex-center"><i class="md-ico">&#xe000;</i></span><span class="md-text-setting"></span></div>
                            </div>
                            <div class="enter-nickname trans-all-200 reg">
                                <input class="md-text-setting" type="text" name="enter-nickname-reg">
                                <div class="place-holder-reg">用户名</div>
                                <div class="err-words pre"><span class="flex-center"><i class="md-ico">&#xe000;</i></span><span class="md-text-setting"></span></div>
                            </div>
                            <div class="row input-passwords">
                                <div class="col-sm-6 col-xs-12" style="height: 52px">
                                    <div class="enter-pass trans-all-200 reg" style="margin: 0; margin-bottom: 15px; position: relative;">
                                        <input class="md-text-setting" type="password" name="enter-pass-reg">
                                        <div class="clear off flex-center" id="on-off-box" style="width: 38px; height: 38px; position:absolute; top: 0; right: 0">
                                            <div class="inner-clear trans-bc-500 sm">
                                                <div id="lb" class="flex-center"><i class="press md-ico">&#xe417;</i></div>
                                                <div id="lt" class="flex-center">
                                                    <div class="lt-viewport flex-center"><span></span><span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="place-holder-reg">密码</div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-xs-12" style="height: 52px">
                                    <div class="enter-passconfirm trans-all-200 reg">
                                        <input class="md-text-setting" type="password" name="enter-passconfirm-reg">
                                        <div class="place-holder-reg">确认</div>
                                    </div>
                                </div>
                                <div class="col-xs-12 err-words pre"><span class="flex-center"><i class="md-ico">&#xe000;</i></span><span class="md-text-setting"></span></div>
                            </div>
                            <div class="some-words">
                                <div class="newLink">
                                    <span class="trans-bc-500" data-href="{{ route('login') }}">登录现有账户</span>
                                </div>
                                <div class="nextStep">
                                    <div class="btn-next flex-center trans-all-200" tabindex="0" id="identifyNow">
                                        <span>注册</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="have-a-look col-md-6 col-xs-12 xs-d-none md-d-block">
                    <div class="img-right-display">
                        <div class="web-slogan pre-text-setting">
                            <p class="md-text-setting" style="line-height: 100%">注册 {{ config('app.name', 'Laravel') }}</p>
                            <p style="font-weight: 300; opacity: .95;">享受更优质的使用</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="./js/_global.js"></script>
<script src="./js/register.js"></script>
</html>