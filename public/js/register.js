window.onload = function(){
    contributeFocus("enter-name-reg");
    contributeFocus("enter-nickname-reg");
    contributeFocus("enter-passconfirm-reg");
    contributeFocus("enter-pass-reg");
    volSetRipple(".btn-next");
    volSetRipple(".newLink span");
    getFocus();
    document.getElementsByTagName("input")[0].focus();
    contributeLinks();
    Toggle_onoff_pass();
}
var ELE = {
    "onOffBox": document.getElementById("on-off-box"),
    "identifyBtn": document.getElementById("identifyNow"),
    "idInput": document.getElementsByName("enter-name-reg")[0],
    "nicknameInput": document.getElementsByName("enter-nickname-reg")[0],
    "passInput": document.getElementsByName("enter-pass-reg")[0],
    "passConfirmInput": document.getElementsByName("enter-passconfirm-reg")[0],
    "globalTimer": {
        "logoTimer": null,
        "baseLogoTimer": null
    }
};
ELE.identifyBtn.onclick = function(){
    my_utils.removeClass(ELE.passInput.parentNode, "failed");
    ELE.passInput.parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#80868b";
    my_utils.removeClass(ELE.passConfirmInput.parentNode, "failed");
    ELE.passConfirmInput.parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#80868b";
    //----
    var oEnternameReg = document.getElementsByClassName("enter-name")[0];
    var oEnternicknameReg = document.getElementsByClassName("enter-nickname")[0];
    var oEnterpasswords = document.getElementsByClassName("input-passwords")[0];
    var res_name_reg = identifyNameReg(ELE.idInput.value);
    var res_nickname = identifyNickNameReg(ELE.nicknameInput.value);
    var res_passwords = identifyPassReg(ELE.passInput.value, ELE.passConfirmInput.value);
    putTip(res_name_reg[0], oEnternameReg);
    putTip(res_nickname[0], oEnternicknameReg);
    putTip(res_passwords[0], oEnterpasswords);
    console.log(identifyPassReg(ELE.passInput.value, ELE.passConfirmInput.value));
    ((res_passwords[1].indexOf("1st-isEmpty") !== -1 ||
        res_passwords[1].indexOf("1st-invalid") !== -1 ||
        res_passwords[1].indexOf("1st-weak") !== -1 ||
        (res_passwords[1].indexOf("pass-notSame") !== -1 && res_passwords[1].indexOf("2nd-isEmpty") === -1)) ? (
            (ELE.passInput.focus()) || console.log("a") ||
            (ELE.passConfirmInput.value = "") || 
            my_utils.addClass(ELE.passInput.parentNode, "failed") ||
            (ELE.passInput.parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#d13239")
        ) : (
            !res_passwords[0] ? (
                ELE.idInput.blur() || 
                ELE.nicknameInput.blur() || 
                ELE.passConfirmInput.blur() || 
                ELE.passInput.blur() || 
                AjaxRequest.post({
                    "url": baseURL + "api/register",
                    "queryString": joint({
                        "email": ELE.idInput.value.replace(/ /g, ""),
                        "name": ELE.nicknameInput.value,
                        "password": ELE.passInput.value,
                        "c_password": ELE.passConfirmInput.value
                    }),
                    "onSuccess": function(req){
                        my_utils.setCookie("token", JSON.parse(req.responseText).token, 1);
                        window.location = baseURL + "needEmail";
                    },
                    "onError": function(req){
                        var errMsg = JSON.parse(req.responseText);
                        console.log(errMsg);
                        var err_email = errMsg["error"]["email"][0]; 
                        if(err_email === "该邮箱已被注册"){
                            // my_utils.addClass(ELE["idInput"].parentNode.querySelector(".err-words"), "name-isRegistered");
                            putTip("name-isRegistered", document.getElementsByClassName("enter-name")[0])
                        }
                        console.log(err_email);
                    }
                })
            ) : (
                (ELE.passConfirmInput.value = "") ||
                (ELE.passConfirmInput.focus()) ||
                my_utils.addClass(ELE.passConfirmInput.parentNode, "failed") ||
                (ELE.passConfirmInput.parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#d13239")
            )
        )
    );
    res_nickname[0] && ELE.nicknameInput.focus();
    res_name_reg[0] && ELE.idInput.focus();
}

ELE.idInput.onkeydown =
ELE.nicknameInput.onkeydown =
ELE.passInput.onkeydown = 
ELE.passConfirmInput.onkeydown = 
ELE.identifyBtn.onkeydown = function(e){
    e.keyCode === 13 && ELE.identifyBtn.onclick();
}
ELE.idInput.addEventListener("blur", function(){
    var n_identifyData = identifyID(this.value, true)[1];
    var data_split = this.value.replace(/\ /g, "").split("");
    if(n_identifyData.indexOf("isEmail") !== -1){
        var AtIdx = data_split.indexOf("@");
        data_split.splice(AtIdx, 0, " ")
    }
    this.value = data_split.join("");
});
function identifyNameReg(val){
    var Res = [];
    var valstr = val.replace(/\ /g, "");
    valstr || Res.push("isEmpty");
    valstr.match(regExps["email"]) || Res.push("notEmail");
    // valstr.match(regExps["phone"]) || Res.push("notPhone");
    valstr.match(regExps["email"]) && Res.push("isEmail");
    // valstr.match(regExps["phone"]) && Res.push("isPhone");
    var resp = Res.indexOf("isEmpty") !== -1 ? 
        "isEmpty" : (
            Res.indexOf("isEmail") === -1 ?
            "invalid" : ""
        )
    var n_data = [];
    n_data.push(resp, Res);
    return n_data;
}
function identifyNickNameReg(val){
    var Res = [];
    var valstr = val.replace(/\ /g, "");
    valstr || Res.push("nickname-isEmpty");
    valstr.length > 10 || Res.push("nickname-isOverflow");
    var resp = Res.indexOf("nickname-isEmpty") !== -1 ? 
        "nickname-isEmpty" : (
            Res.indexOf("nickname-isOverflow") === -1?
            "nickname-isOverflow" : ""
        )
    var n_data = [];
    n_data.push(resp, Res);
    return n_data;
}
function Toggle_onoff_pass(){
    var t_count = 0;
    ELE.onOffBox.onclick = function(){
        t_count++;
        if(t_count % 2 === 1){
            my_utils.removeClass(this, "off");
            my_utils.addClass(this, "on");
            ELE.passInput.type = "text";
            ELE.passConfirmInput.type = "text";
        }else{
            my_utils.removeClass(this, "on");
            my_utils.addClass(this, "off");
            ELE.passInput.type = "password";
            ELE.passConfirmInput.type = "password";
        }
    }
}
console.log(document.cookie)
// onoff_pass(ELE.onOffBox, ELE.passInput);
// onoff_pass(ELE.onOffBox, ELE.passConfirmInput);