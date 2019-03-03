window.onload = function(){
    volSetRipple(".newLink span");
    contributeFocus("enter-passconfirm-reg");
    contributeFocus("enter-pass-reg");
    Toggle_onoff_pass();
    getFocus();
    document.getElementsByTagName("input")[0].focus();
}
var ELE = {
    "toggle-info-content": document.getElementById("toggle-info-content"),
    "info-content": document.getElementsByClassName("info-content")[0],
    "onOffBox": document.getElementById("on-off-box"),
    "identifyBtn": document.getElementById("identifyNow"),
    "passInput": document.getElementsByName("enter-pass-reg")[0],
    "passConfirmInput": document.getElementsByName("enter-passconfirm-reg")[0],
    "pass-strength": document.getElementsByClassName("pass-strength")[0],
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
    var oEnterpasswords = document.getElementsByClassName("input-passwords")[0];
    var res_passwords = identifyPassReg(ELE.passInput.value, ELE.passConfirmInput.value);
    putTip(res_passwords[0], oEnterpasswords);
    ((res_passwords[1].indexOf("1st-isEmpty") !== -1 ||
        res_passwords[1].indexOf("1st-invalid") !== -1 ||
        res_passwords[1].indexOf("1st-weak") !== -1 ||
        (res_passwords[1].indexOf("pass-notSame") !== -1 && res_passwords[1].indexOf("2nd-isEmpty") === -1)) ? (
            (ELE.passInput.focus()) ||
            (ELE.passConfirmInput.value = "") || 
            my_utils.addClass(ELE.passInput.parentNode, "failed") ||
            (ELE.passInput.parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#d13239")
        ) : (
            !res_passwords[0] ? (
                ELE.passConfirmInput.blur() || 
                ELE.passInput.blur()
            ) : (
                (ELE.passConfirmInput.value = "") ||
                (ELE.passConfirmInput.focus()) ||
                my_utils.addClass(ELE.passConfirmInput.parentNode, "failed") ||
                (ELE.passConfirmInput.parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#d13239")
            )
        )
    );
}
ELE.passInput.onkeydown = 
ELE.passConfirmInput.onkeydown = 
ELE.identifyBtn.onkeydown = function(e){
    e.keyCode === 13 && ELE.identifyBtn.onclick();
}
ELE.passInput.addEventListener("blur", function(){
    var val = this.value;
    var dict = {"len>=8": 2, "len<8": -1.5, "len>12": 1, "has_l": 2, "has_3_l": 1, "has_s": 3, "has_2_s": 1};
    var Res = [];
    val.length >= 8 && Res.push("len>=8");
    val.length < 8 && Res.push("len<8");
    val.length > 12 && Res.push("len>12");
    var letters = val.match(/[a-zA-Z]/g);
    letters ? (letters.length >= 3 ? Res.push("has_l", "has_3_l") : Res.push("has_l")) : "";
    var symbols = val.match(regExps["symbols"]);
    symbols ? (symbols.length >= 2 ? Res.push("has_s", "has_2_s") : Res.push("has_s")) : "";
    var result = 0;
    for(var a = 0; a<Res.length; a++){result += dict[Res[a]];}
    var cla = result < 6 ? "_s_" : (result < 9 ? "_m_" : "_l_");
    my_utils.addClass(ELE["pass-strength"], cla);
});
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
ELE["toggle-info-content"].onclick = function(){
    classListExist(ELE["info-content"], "hidden") ? 
    my_utils.removeClass(ELE["info-content"], "hidden") || (this.innerText = "隐藏提示信息") :
    my_utils.addClass(ELE["info-content"], "hidden") || (this.innerText = "提示信息")
}