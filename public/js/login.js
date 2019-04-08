window.onload = function(){
    contributeFocus("enter-name");
    contributeFocus("enter-pass");
    volSetRipple(".btn-next");
    volSetRipple(".newLink span");
    contributeLinks();
    ELE["idInput"].focus();
    false || (console.log("b") || console.log("c") || console.log("d") || console.log("e"));
}
var ELE = {
    "onOffBox": document.getElementById("on-off-box"),
    "passInput": document.getElementsByName("enter-pass")[0],
    "idInput": document.getElementsByName("enter-name")[0],
    "identifyBtn": document.getElementById("identifyNow"),
    "tit": document.getElementsByClassName("tit")[0],
    "bottom_outer": document.getElementsByClassName("bottom_outer")[0],
    "backBtn": document.getElementById("back_"),
    "logo-part": {
        "for-loading-ani": document.getElementsByClassName("for-loading-ani")[0],
        "logo-icon": document.getElementById("logo-icon"),
        "loading-box": document.getElementsByClassName("loading-box")[0]
    },
    "globalTimer": {
        "logoTimer": null,
        "baseLogoTimer": null
    }
};
onoff_pass(ELE.onOffBox, ELE.passInput);
ELE.identifyBtn.onclick = function(){
    var oEntername = document.getElementsByClassName("enter-name")[0];
    var oEnterpass = document.getElementsByClassName("enter-pass")[0];
    var resName = identifyID(ELE.idInput.value, "PASS")[0];
    var resPass = identifyPass(ELE.passInput.value, "PASS");
    putTip(resName, oEntername);
    putTip(resPass, oEnterpass);
    resName ? (ELE.idInput.focus()) : (
        resPass ? ELE.passInput.focus() : (
            ELE.idInput.blur() || ELE.passInput.blur()
        )
    );
    // 如果 id 符合规范 且 密码不为空 则 发送登录请求 以及 播放 loading 动画
    !((resName !== "invalid" || resName !== "isEmpty") && ELE.passInput.value) || (
    my_utils.Ajax({
        "url": baseURL + "api/login",
        "method": "POST",
        "dataType": "text",
        "data": {
            email: ELE.idInput.value.replace(/ /g, ""),
            password: ELE.passInput.value
        },
        "beforeSend": function(oXML){
            oXML.setRequestHeader("Accept", "application\/json");
        },
        success: function(res){
            console.log(JSON.parse(res)["token"]["access_token"]);
            // ELE.idInput.blur(); ELE.passInput.blur(); my_utils.addClass(ELE.tit, "identifying"); my_utils.addClass(ELE.bottom_outer, "translateX-50p");
            my_utils.setCookie("token", JSON.parse(res)["token"]["access_token"], 1);
            // window.location = baseURL;
        },
        error: function(error){
            console.log(JSON.parse(error))
            putTip("pass-wrong", document.getElementsByClassName("enter-pass")[0]);
            ELE.globalTimer.baseLogoTimer = setTimeout(function(){
                new loading("reverse");
                clearTimeout(ELE.globalTimer.baseLogoTimer)
            }, 200);
        }
    }) || (new loading()));
};
ELE.backBtn.onclick = function(){
    my_utils.removeClass(ELE.bottom_outer, "translateX-50p");
    my_utils.removeClass(ELE.tit, "identifying");
    new loading("reverse");
}
ELE.passInput.onkeydown = 
ELE.idInput.onkeydown =
ELE.identifyBtn.onkeydown = function(e){
    e.keyCode === 13 && ELE.identifyBtn.onclick();
}
ELE.idInput.addEventListener("blur", function(){
    var n_identifyData = identifyID(this.value, true)[1];
    var data_split = this.value.replace(/ /g, "").split("");
    if(n_identifyData.indexOf("isEmail") !== -1){
        var AtIdx = data_split.indexOf("@");
        data_split.splice(AtIdx, 0, " ")
    }
    this.value = data_split.join("");
});
console.log(my_utils.getCookie("token"));
