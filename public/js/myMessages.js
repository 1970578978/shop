
var ELE = {
    "lv2-nav": document.getElementsByClassName("lv2-nav")[0],
    "lv2-container": document.getElementsByClassName("lv2-container")[0]
};
ELE["lv2-container"].onscroll = function(){
    this.scrollTop ? my_utils.removeClass(ELE["lv2-nav"], "topped") : my_utils.addClass(ELE["lv2-nav"], "topped");
};
function addMsgToggle () {
    var targets = trans2Arr(document.getElementsByClassName("setting-list"));
    targets.myForEach(function (item) {
        item.onclick = function(){
            var parNode = item.parentNode;
            classListExist(parNode, "active") ? my_utils.removeClass(parNode, "active") : my_utils.addClass(parNode, "active");
            my_utils.removeClass(this, "not-read");
        };
    });
};
addMsgToggle();