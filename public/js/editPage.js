window.onload = function(){
    volSetRipple(".backwards")
}
var ELE = {
    "lv2-nav": document.getElementsByClassName("lv2-nav")[0],
    "lv2-container": document.getElementsByClassName("lv2-container")[0],
    "user-base-toggle": document.getElementById("user-base-toggle")
}
ELE["lv2-container"].onclick = function(){
    ELE["user-base-toggle"].checked = false;
}
ELE["lv2-container"].onscroll = function(){
    this.scrollTop ? my_utils.removeClass(ELE["lv2-nav"], "topped") : my_utils.addClass(ELE["lv2-nav"], "topped");
}