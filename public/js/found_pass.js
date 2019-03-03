window.onload = function(){
    contributeFocus("enter-name");
    document.getElementsByTagName("input")[0].focus();
}
var ELE = {
    "toggle-info-content": document.getElementById("toggle-info-content"),
    "fp_tip_pre": document.getElementById("fp_tip_pre"),
    "oCoverTimer": document.getElementById("cover-timer"),
    "info-content": document.getElementsByClassName("info-content")[0],
    "idInput": document.getElementsByName("enter-name")[0],
    "identifyBtn": document.getElementById("identifyNow"),
    "logo-part": {
        "for-loading-ani": document.getElementsByClassName("for-loading-ani")[0],
        "logo-icon": document.getElementById("logo-icon"),
        "loading-box": document.getElementsByClassName("loading-box")[0]
    },
    "globalTimer": {
        "coverStartLength": 60,
        "logoTimer": null,
        "baseLogoTimer": null,
        "coverTimer": null
    }
}
ELE.identifyBtn.onclick = function(){
    var that = this;
    var saveCoverTimerLength = ELE.globalTimer.coverStartLength;
    var oEntername = document.getElementsByClassName("enter-name")[0];
    var resName = identifyID(ELE.idInput.value, "PASS")[0];
    putTip(resName, oEntername);
    resName ? (ELE.idInput.focus()) : (
        ELE.idInput.blur()
    );
    clearInterval(ELE.globalTimer.coverTimer);
    ELE.oCoverTimer.innerText = ELE.globalTimer.coverStartLength;
    resName ? my_utils.addClass(ELE.fp_tip_pre, "hidden") : my_utils.removeClass(ELE.fp_tip_pre, "hidden") ||
    my_utils.addClass(this, "disabled") || my_utils.removeClass(ELE.oCoverTimer, "hidden") ||
    my_utils.Ajax({
        "url": baseURL + "api/forgot-password",
        "method": "POST",
        "data": {
            email: ELE.idInput.value.replace(/ /g, "")
        },
        "beforeSend": function(oXML){
            oXML.setRequestHeader("Accept", "application\/json");
        },
        success: function(res){
            console.log(res);
        },
        error: function(err){
            console.log(err)
        }
    }) ||
    (ELE.globalTimer.coverTimer = setInterval(function(){
        ELE.globalTimer.coverStartLength--;
        if(ELE.globalTimer.coverStartLength === 0){
            my_utils.removeClass(that, "disabled");
            my_utils.addClass(ELE.oCoverTimer, "hidden");
            clearInterval(ELE.globalTimer.coverTimer);
            ELE.globalTimer.coverStartLength = saveCoverTimerLength;
            ELE.oCoverTimer.innerText = ELE.globalTimer.coverStartLength;
        }else{
            ELE.oCoverTimer.innerText = ELE.globalTimer.coverStartLength;
        }
    }, 1000))
    && (new loading());
}
ELE.idInput.onkeydown =
ELE.identifyBtn.onkeydown = function(e){
    !classListExist(ELE.identifyBtn, "disabled") &&
    e.keyCode === 13 && ELE.identifyBtn.onclick();
}
ELE["toggle-info-content"].onclick = function(){
    classListExist(ELE["info-content"], "hidden") ? 
    my_utils.removeClass(ELE["info-content"], "hidden") || (this.innerText = "隐藏详细信息") :
    my_utils.addClass(ELE["info-content"], "hidden") || (this.innerText = "详细信息")
}