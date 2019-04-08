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
                    <div class="md-text-setting flex-center logo-name"><span id="tit_edit" class="tit identify-your-email"></span></div>
                    <div class="info-content md-text-setting">
                        <p class="inf_plain" id="p1_edit">我们稍后会向您刚才注册所用的电子邮箱发送一封邮件，点击邮件中的蓝色链接即可完成账号注册。</p>
                        <p class="inf_grey" id="p2_edit">此邮件可能会被自动拦截，如未收到邮件，请检查邮件的垃圾箱。</p>
                        <p class="inf_grey" id="p2_edit">如果未收到邮件，请点击下面的按钮。</p>
                    </div>
                    <div class="some-words" style="padding: 20px 0 10px">
                            <div class="nextStep" style="justify-content: flex-start">
                                <div class="btn-next flex-center trans-all-200" tabindex="0" id="identifyNow">
                                    <span>重新发送</span>
                                </div>
                            </div>
                    </div>
                    <div class="newLink" style="justify-content: flex-end; margin: 60px 0 0 50%; align-items: flex-end; height: auto">
                        <span class="trans-bc-500" id="delta_edit" data-href="./" style="margin-right: -8px; position: relative; overflow: hidden;">我知道了</span>
                    </div>
                </div>
                <div class="have-a-look col-md-6 col-xs-12 xs-d-none md-d-block">
                    <div class="img-right-display reg_success" id="img_edit" style="background-image: url(./_test/rs-1.png);">
                        <div class="web-slogan pre-text-setting">
                            <p class="md-text-setting" id="mtt_edit" style="line-height: 100%; margin: 0">验证您的邮件地址</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="./js/_global.js"></script>
<script>contributeLinks();</script>
<script>
contributeLinks();
var resendBtn = document.getElementById("identifyNow");
resendBtn.onclick = function(){
    var token = my_utils.getCookie("token");
    my_utils.Ajax({
        "url": baseURL + "api/resend-email",
        "method": "POST",
        "dataType": "text",
        "beforeSend": function(oXML){
            oXML.setRequestHeader("Accept", "application\/json");
            oXML.setRequestHeader("Authorization", "Bearer\ " + token);
        },
        success: function(res, code){
            console.log(JSON.parse(res), code)
        },
        error: function(err, code){
            console.log(JSON.parse(err), code)
        }
    });
}
</script>
</body></html>