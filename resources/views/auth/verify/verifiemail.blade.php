<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name', 'Laravel') }}-请查看并验证您的邮件</title>
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="./css/login_reg.css">
    <style>@media only screen and (min-width: 48em){.register-box {height: auto;}}</style>
</head>
<body>
    <div class="elemall-container register">
        <div class="register-box">
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="logo-header"><img src="./mall.svg" alt="logo-ico" width="30px" height="30px"></div>
                    <div class="md-text-setting flex-center logo-name"><span id="tit_edit" class="tit"></span></div>
                    <div class="info-content md-text-setting">
                        <p class="inf_plain" id="p1_edit"></p>
                        <p class="inf_grey" id="p2_edit"></p>
                    </div>
                    <div class="newLink" style="justify-content: flex-end; margin: 60px 0 0 50%; align-items: flex-end; height: auto">
                        <span class="trans-bc-500" id="delta_edit" data-href="./login.html" style="margin-right: -8px"></span>
                    </div>
                </div>
                <div class="have-a-look col-md-6 col-xs-12 xs-d-none md-d-block">
                    <div class="img-right-display reg_success" id="img_edit">
                        <div class="web-slogan pre-text-setting">
                            <p class="md-text-setting" id="mtt_edit" style="line-height: 100%; margin: 0"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="code_tooken" style="display: none">{{ $data['token'] }}</div>
    <div id="code_e_tooken" style="display: none">{{ $data['email_token'] }}</div>
</body>
<script src="./js/_global.js"></script>
<script src="./js/reg_success.js"></script>
</html>