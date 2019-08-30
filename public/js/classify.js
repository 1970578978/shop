(function contributeCrumb(){
    var that = this;
    this.getStyle = function(obj, name){
        if(obj.currentStyle){
            return obj.currentStyle[name]; // ->  IE 支持
        }else{
            return getComputedStyle(obj, false)[name]; // -> IE 6 7 8 不支持
        }
    }
    this.scroll2END = function(obj){
        var w = parseFloat(obj.getElementsByTagName("ol")[0].style.width);
        // obj.scrollTo(w, 0);
    }
    var crumbOrder = document.getElementsByClassName("bread_crumb");
    for(var j=0; j<crumbOrder.length; j++){
        var crumbList = crumbOrder[j].getElementsByTagName("li");
        var totalWidth = 0;
        for(var k=0; k<crumbList.length; k++){
            totalWidth+=parseFloat(that.getStyle(crumbList[k], "width"));
            totalWidth+=15;
            crumbList[k].style.animationDelay = 20*k + "ms";
        }
        crumbOrder[j].getElementsByTagName("ol")[0].style.width = totalWidth+75 + "px";
        that.scroll2END(crumbOrder[j]);
    }
    window.onresize = function(){
        for(var k=0; k<crumbOrder.length; k++){
            scroll2END(crumbOrder[k]);
        }
    }
})();
window.onload = function(){
    classifyBtn();
    setMenuBtnColor("#000");
    prev_menuBtnColor = "#000";
    fixSideMenu();
    classifyList();
    document.onscroll();
};
function classifyBtn(){
    var toggle = document.getElementById("classify-toggle");
    toggle.onmousedown = function(){
        var cb = this.getElementsByClassName("circle-bg")[0];
        var sp = this.getElementsByTagName("span")[0];
        var cs = this.parentNode.parentNode.parentNode;
        my_utils.removeClass(cb, "act");
        var that_timer = this.timer = setTimeout(function(){
            my_utils.addClass(cb, "act");
            clearTimeout(that_timer);
        }, 10);
        sp.innerHTML = (sp.innerHTML === "收起" ? "展开" : "收起");
        classListExist(cs, "shrink") ? my_utils.removeClass(cs, "shrink") : my_utils.addClass(cs, "shrink");
    }
};
var iconcoll = trans2Arr(document.getElementsByClassName("tab"));
var prev_img_idx = 0;
function classifyList(){
    iconcoll.myForEach(function(item, idx){
        item.onclick = function(){
            var tarPart = this.getAttribute("data-target");
            var tarEle = document.querySelector("." + tarPart);
            scrollToCh_Ele(
                document.documentElement, 
                tarEle,
                0,
                500
            );
            var icon = this.getElementsByTagName("img")[0];
            var prev_icon = iconcoll[prev_img_idx].getElementsByTagName("img")[0];
            prev_icon.setAttribute("src", prev_icon.dataset.src);
            icon.setAttribute("src", icon.dataset.hlSrc);
            my_utils.removeClass(iconcoll[prev_img_idx], "actived");
            my_utils.addClass(this, "actived");
            prev_img_idx = idx;
        }
    });
};
function fixSideMenu(){
    var content = document.querySelector(".classify-container");
    var menu = document.querySelector(".sideMenu");
    document.onscroll = function () {
        var posi = content.getBoundingClientRect(), y = posi.y, x = posi.x, t = posi.top;
        my_utils[(t <= 0 ? "add" : "remove") + "Class"](menu, "fixed");
        menu.style.left = x + "px";
        // console.log(posi)
        var n = activeSideMenu();
        var icon = iconcoll[n].getElementsByTagName("img")[0];
        var prev_icon = iconcoll[prev_img_idx].getElementsByTagName("img")[0];
        prev_icon.setAttribute("src", prev_icon.dataset.src);
        icon.setAttribute("src", icon.dataset.hlSrc);
        my_utils.removeClass(iconcoll[prev_img_idx], "actived");
        my_utils.addClass(iconcoll[n], "actived");
        prev_img_idx = n;
    }
    window.addEventListener("resize", document.onscroll, {passive: true});
};
function scrollToCh_Ele (fa_ele, ch_ele, buf, dur, fn) {
    let scrollLength = ch_ele.getBoundingClientRect().top - fa_ele.getBoundingClientRect().top + buf||0;
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    var scrollTo = function(element, to, duration){
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
            
        var animateScroll = function(){
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
        fn && fn();
    };
    scrollTo(fa_ele, scrollLength, dur)
};
function activeSideMenu () {
    var cl_parts = document.querySelectorAll("[name='classify-part']");
    var anchor = 0;
    var ruler = [0, 125];
    for (var i = 0, l = cl_parts.length; i < l; i++) {
        var part = cl_parts[i];
        var posi = part.getBoundingClientRect();
        ruler.push(ruler[ruler.length-1]+posi.height);
    };
    for (var j = 0, m = ruler.length; j < m; j++) {
        if (-document.documentElement.getBoundingClientRect().top + .375 >= ruler[j]) {
            ruler[j-1] && (anchor = j-1);
        }
    };
    return anchor;
}