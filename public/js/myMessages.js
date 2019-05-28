
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
            var isActive = classListExist(parNode, "active");
            item.overHeight || (item.overHeight = 
                parseFloat(window.getComputedStyle(
                    parNode.querySelector(".part-container"), "").getPropertyValue("height")
                ) > 384 // 24rem
            );
            item.h || (
                item.h = Math.min(parseFloat(
                    window.getComputedStyle(
                        parNode.querySelector(".part-container"), "")
                        .getPropertyValue("height")) + (item.overHeight ? 0 : 20)
                , 384)
            );
            var timer = null;
            var msg_dis_con = parNode.querySelector(".message-display-container");
            item.overHeight === false && (msg_dis_con.style.overflow = "hidden");
            if (isActive) {
                msg_dis_con.style.height = 0 + "px";
                my_utils.removeClass(parNode, "active");
                timer = setTimeout(function(){
                    msg_dis_con.style.display = "none";
                    clearTimeout(timer);
                }, 250);
            }else{
                my_utils.addClass(parNode, "active");
                msg_dis_con.style.display = "block";
                msg_dis_con.style.height = item.h + "px";
            };
            my_utils.removeClass(this, "not-read");
        };
    });
};
addMsgToggle();