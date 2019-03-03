window.onload = function(){
    contributeLinks();
    volSetRipple(".newLink span");
    renderPage(4);
    my_utils.Ajax({
        "url": baseURL + "api/register",
        "method": "POST",
        "data": {
            "email_token": ELE.code_e_tooken
        },
        "beforeSend": function(oXML){
            oXML.setRequestHeader("Accept", "application\/json");
            oXML.setRequestHeader("Authorization:", "Bearer\ " + ELE.code_tooken);
        },
        success: function(res, code){
            console.log(res);
            console.log("code_res_success", code);
        },
        error: function(err, code){
            console.log(err)
            console.log("code_err_error", code);
        }
    })
}
var ELE = {
    "tit": document.getElementById("tit_edit"),
    "p1": document.getElementById("p1_edit"),
    "p2": document.getElementById("p2_edit"),
    "delta": document.getElementById("delta_edit"),
    "img": document.getElementById("img_edit"),
    "mtt": document.getElementById("mtt_edit"),
    "code_tooken": document.getElementById("tit_edit").innerText,
    "code_e_tooken": document.getElementById("tit_edit").innerText
};
var imgURL = "./_test/";
const inf_group = {"1": { "tit": "identify-your-email", "p1": "我们稍后会向您刚才注册所用的电子邮箱发送一封邮件，点击邮件中的蓝色链接即可完成账号注册。", "p2": "此邮件可能会被自动拦截，如未收到邮件，请检查邮件的垃圾箱。", "delta": "我知道了", "img": "rs-1.png", "mtt": "验证您的邮件地址"},"2": { "tit": "invalid-link", "p1": "请检查您的验证链接是否正确", "p2": "", "delta": "确定", "img": "rs-2.svg", "mtt": "验证出错"},"3": { "tit": "reg-ok", "p1": "恭喜您注册成功，点击下方的确定按钮将跳转到登录界面", "p2": "", "delta": "确定", "img": "rs-3.png", "mtt": "注册成功"},"4": { "tit": "link-failure", "p1": "验证链接时限已过期", "p2": "", "delta": "确定", "img": "rs-2.svg", "mtt": "验证失败"}};
function renderPage(b){
    for(var c in inf_group[b]){
        switch (c) {
            case "img": ELE[c].style.backgroundImage = "url(" + imgURL + inf_group[b][c] + ")"; break;
            case "tit": ELE[c].className = "tit\ " + inf_group[b][c]; break;
            default: ELE[c].innerText = inf_group[b][c]; break;
        }
    }
}