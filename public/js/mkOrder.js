window.onload = function(){
    mkSlidePl();
};
var ELE = {
    "lv2-nav": document.getElementsByClassName("lv2-nav")[0],
    "lv2-container": document.getElementsByClassName("lv2-container")[0],
    "dia_bg": document.getElementsByClassName("dia_bg")[0],
    "dia-box": document.getElementsByClassName("dia-box")[0],
    "dia-title": document.getElementsByClassName("dia-title")[0],
    "dia-content": document.getElementsByClassName("dia-content")[0],
    "dia-footer": document.getElementsByClassName("dia-footer")[0],
    "selection_bg": document.getElementsByClassName("selection_bg")[0],
    "user_profile": document.getElementsByClassName("user_profile")[0],
};
ELE["lv2-container"].onscroll = function(){
    this.scrollTop ? my_utils.removeClass(ELE["lv2-nav"], "topped") : my_utils.addClass(ELE["lv2-nav"], "topped");
};
ELE["selection_bg"].onclick = function(){
    document.getElementById("user-base-toggle").checked = false;
    this.style.visibility = "hidden";
};
ELE["user_profile"].onclick = function(){
    var user_tog = document.getElementById("user-base-toggle").checked;
    user_tog ? (ELE["selection_bg"].style.visibility = "hidden") : (ELE["selection_bg"].style.visibility = "visible");
};
document.getElementsByClassName("post-order")[0].onclick = function(){
    setDialog({
        "title": "订单提交成功",
        "content": '<p>请稍后片刻，即将跳转至支付界面...</p><p>如长时间未跳转请点击此窗口下方按钮手动进行跳转。</p>',
        "footer": [
            {
                "label": "跳转到支付界面",
                "fn": function(){
                    console.log("a")
                }
            }
        ]
    });
    my_utils.addClass(ELE["dia_bg"], "show_dia");
};
trans2Arr(document.getElementsByClassName("md-radioBtn")).myForEach(function(item){
    item.onclick = function(){
        this.querySelector("input[type='radio']").checked = true;
    }
});
function mkSlidePl(){
    var SlideGrp = trans2Arr(document.getElementsByClassName("slide-down-panel"));
    SlideGrp.myForEach(function(item){
        var toggler = document.getElementById(item.dataset.for);
        var thisHeight = window.getComputedStyle(item.getElementsByClassName("table")[0], "").getPropertyValue("height");
        toggler.onclick = function(){
            var actd = classListExist(item, "actived");
            item.style.height = actd ? 0 : thisHeight;
            actd ? my_utils.removeClass(item, "actived") : my_utils.addClass(item, "actived");
        }
    });
};
function setDialog(json){
    var $josn$ = {};
    $josn$.title = json.title || ""; 
    $josn$.content = json.content || "";
    $josn$.footer = json.footer || [];
    var oDia_title = ELE["dia_bg"].querySelector(".dia-title");
    var oDia_content = ELE["dia_bg"].querySelector(".dia-content");
    oDia_title.innerHTML = $josn$.title;
    oDia_content.innerHTML = $josn$.content;
    addDiaOptions($josn$.footer);
};
function addDiaOptions(json){
    var oDiv_footer = ELE["dia_bg"].querySelector(".dia-footer");
    removeInnerEle(oDiv_footer);
    json.myForEach(function(item, idx){
        var n_Button = document.createElement("button");
        n_Button.innerHTML = '<span>' + item.label +'</span>';
        n_Button.onclick = function(e){
            item.fn(e, this);
        }
        oDiv_footer.appendChild(n_Button)
    });
};