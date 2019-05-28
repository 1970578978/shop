Array.prototype.myForEach = function myForEach(callBack, context) {
    typeof context === "undefined" ? context = window : null;
    if ("forEach" in Array.prototype) {
        this.forEach(callBack, context);
        return;
    }
    for (var i = 0; i < this.length; i++) {
        typeof callBack === "function" ? callBack.call(context, this[i], i, this) : null;
    }
};
// Events Functions
const baseURL = "https://shop.yixinping.cn/";
// Objects
var t = document.createElement("a");
// 
var menu_button = document.getElementById("menu_button") || t;
var my_cart = document.getElementById("my_cart") || t;
var search_bar = document.getElementById("search_bar") || t;
var mdSearch = document.getElementById("md-search") || t;
var mdbtnSearch = document.getElementById("btn-search") || t;
var cartList = document.getElementById("cart-list") || t;
var header_banner = document.getElementById("header-banner") || t;
var my_account = document.getElementById("my_account") || t;
var search_panel = document.getElementById("search_panel") || t;
var menu_lists = document.getElementById("menu_lists") || t;
var menu_box = document.getElementById("menu-box") || t;
var mdSearchIco = document.getElementById("md-search-ico") || t;
var mdSearchBox = document.getElementsByClassName("md-search-box")[0] || t;
var smSearchList = document.getElementById("sm-search_part") || t;
var t_about = document.getElementById("t_about") || t;
var m_info = document.getElementById("more_info") || t;
var max_list_size = 6;
var my_utils = new my_utils();
var searchList = document.getElementById("search-list") || t;
var prev_menuBtnColor = "#fff";
var windowHeight = window.innerHeight;

var regExps = {
    "email": /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    "phone": /^1(3|4|5|7|8)\d{9}$/,
    "HEX_color": /^#[\da-f]{3}([\da-f]{3})?$/i,
    "onlyEN_NUM": /[a-zA-Z0-9]/g,
    "symbols": /(\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\=|\+|\-|\ |\{|\}|\:|\||\<|\>|\?|\[|\]|\;|\'|\\|\,|\.|\"|\/|\-)/g
}
// Must Run
refreshCart();
forRemoveItem();

// setRipples
volSetRipple(".feature-content", {
    "x": 46, 
    "y": 12, 
});
volSetRipple(".menu-lists li");
volSetRipple("#btn-go");
volSetRipple(".menu_item");
volSetRipple(".item i");
volSetRipple(".suggest_part .profile");
volSetRipple(".col_list_item");
volSetRipple(".col_title .more");
volSetRipple(".footer-menu-item");
volSetRipple("#t_about");
// ----- !!!! 搜索候选列表 ----- //
embedToTop("#search-list .list .toTop", mdSearch, function() {
    var group = searchList.getElementsByClassName("feature-content");
    for(var y=0; y<group.length; y++){
        my_utils.removeClass(group[y], "selected");
    }
    mdSearch.focus();
});
embedToTop("#sm-search_part .list .toTop", search_bar, function() {
    search_bar.focus();
});


menu_button.onclick = function(){
    var that = this;
    if(classListExist(menu_button, "active")){
        my_utils.removeClass(that, "active");
        classListExist(search_panel, "flip") && my_utils.removeClass(search_panel, "flip");
        classListExist(menu_box, "flip") && my_utils.removeClass(menu_box, "flip");
        header_banner.style.position = "absolute";
        document.body.style.overflow = "auto";
        setMenuBtnColor(prev_menuBtnColor);
    }else{
        setMenuBtnColor(prev_menuBtnColor);
        my_utils.addClass(that, "active");
        my_utils.addClass(menu_box, "flip");
        header_banner.style.position = "fixed";
        document.body.style.overflow = "hidden";
    }
};
my_cart.onclick = function(e){
    stopBubble(e);
    my_utils.removeClass(mdSearchBox, "fall");
    my_utils.removeClass(searchList, "fall");
    if(classListExist(cartList, "slidedown")){hide_cart_list();}
    else{show_cart_list();}
    refreshCart();
}
document.onclick = function(e){
    stopBubble(e);
    classListExist(cartList, "slidedown") && hide_cart_list();
}
cartList.onclick = function(e){
    stopBubble(e);
}
search_bar.onfocus = function(){
    if(document.body.clientWidth < 992){
        search_panel.style.display = "block";
        classListExist(menu_box, "flip") || my_utils.addClass(search_panel, "flip");
        my_utils.addClass(menu_button, "active");
        
        setMenuBtnColor("#636161");
        classListExist(search_panel, "flip") || my_utils.addClass(search_panel, "flip");
        classListExist(search_panel, "flip") && my_utils.removeClass(menu_box, "flip");
        header_banner.style.position = "fixed";
        document.body.style.overflow = "hidden";
    }
}
window.onresize = function(){
    windowHeight = window.innerHeight;
    if(document.body.clientWidth >= 768 && search_panel.className === "search_panel flip"){
        my_utils.removeClass(menu_button, "active");
        my_utils.removeClass(search_panel, "flip");
        my_utils.removeClass(cartList, "slidedown");
        header_banner.style.position = "absolute";
        document.body.style.overflow = "auto";
    }else if(document.body.clientWidth >= 768 && classListExist(menu_box, "flip")){
        my_utils.removeClass(menu_button, "active");
        my_utils.removeClass(menu_box, "flip");
        header_banner.style.position = "absolute";
        document.body.style.overflow = "auto";
    }
    else{
        cartList.style.display = "none";
    }
    if(classListExist(m_info, "look")) my_utils.removeClass(m_info, "look");
}
var listindi = -1;
mdSearch.onkeydown = function(e){
    // 38\up 40\down
    var key = e.keyCode;
    switch(key){
        case 38:
            var group = searchList.getElementsByClassName("feature-content");
            if(listindi === -1) listindi = group.length - 1;
            else listindi--;
            if(listindi < 0) listindi = group.length - 1;
            break;
        case 40:
            var group = searchList.getElementsByClassName("feature-content");
            if(listindi === -1) listindi = 0;
            else listindi++;
            if(listindi >= group.length) listindi = 0;
            break;
        default:
            return;
    }
    for(var z=0; z<group.length; z++){
        my_utils.removeClass(group[z], "selected");
    }
    my_utils.addClass(group[listindi], "selected");
    mdSearch.value = group[listindi].parentNode.innerText;
    mdSearch.onfocus();
}
mdSearch.oninput = mdSearch.onfocus = function(e){
    if(this.value.replace(/ /g, "").length>0){
        my_utils.addClass(document.getElementById("btn-go"), "active");
        my_utils.addClass(searchList, "fall");
    }else{
        my_utils.removeClass(document.getElementById("btn-go"), "active");
        my_utils.removeClass(searchList, "fall");
    }
}
mdbtnSearch.onclick = function(){
    var searchBarState = getStyle(mdSearchBox, "visibility");
    var s = searchBarState === "hidden"?true:false;
    s?my_utils.addClass(mdSearchBox, "fall"):my_utils.removeClass(mdSearchBox, "fall");
    s && mdSearch.focus();
}
search_bar.oninput = function(){
    // ---- //
    my_utils.removeClass(menu_box, "flip");
    this.onfocus();
    // ---- //
    // ---- //
    my_utils.removeClass(smSearchList, "xs-d-none");
    my_utils.removeClass(smSearchList, "xs-d-block");
    var val = this.value.replace(/ /g, "");
    val.length && my_utils.addClass(smSearchList, "xs-d-block");
    val.length || my_utils.addClass(smSearchList, "xs-d-none");
    // ---- //
}
t_about.onclick = function(){
    classListExist(m_info,"look")?my_utils.removeClass(m_info, "look"):my_utils.addClass(m_info, "look");
}
// Functions
function setMenuBtnColor(str){
    var pathGroup = menu_button.getElementsByTagName("path");
    for(var i=0; i<pathGroup.length; i++){
        pathGroup[i].style.stroke = str || "#fff";
    }
}
function refreshCart(){
    var num = cartList.getElementsByClassName("menu-item").length;
    setCartNum(num);
    if(num > max_list_size+1) my_utils.addClass(cartList, "full");
    else my_utils.removeClass(cartList, "full");
    if(num === 1) my_utils.addClass(cartList, "isempty");
    else my_utils.removeClass(cartList, "isempty");
};
function forRemoveItem(){
    var that = this;
    var cart_list = cartList.getElementsByClassName("menu-item");
    this.prev_icon = "";
    for(var i=0; i<cart_list.length; i++){
        cart_list[i].onmouseover = function(){
            that.prev_icon = this.getElementsByTagName("i")[0].innerHTML;
            if(this.getElementsByTagName("i")[0].dataset.change !== "not_change") this.getElementsByTagName("i")[0].innerHTML = "&#xe5c9;";
        }
        cart_list[i].onmouseout = function(){
            this.getElementsByTagName("i")[0].innerHTML = that.prev_icon;
        }
        cart_list[i].getElementsByTagName("i")[0].onclick = function(e){
            stopBubble(e);
            var parentList = this.parentNode.parentNode;
            if(this.dataset.change !== "not_change") cartList.removeChild(parentList);
            refreshCart();
        }
    }
};
function classListExist(obj, val){
    var bool = false;
    var cl = my_utils.classList(obj);
    for(var x=0; x<cl.length; x++){
        if(cl[x] === val){bool = true; break;}
    }
    return bool;
};
function show_cart_list(){
    cartList.style.display = "block";
    my_utils.addClass(cartList, "slidedown");
}
function hide_cart_list(){
    my_utils.removeClass(cartList, "slidedown");
    cartList.style.display = "none";
};
/* 兼容 IE, getComputedStyle */
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
};
function getStyle(obj, name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}
function stopBubble(e){ // 阻止事件冒泡（兼容IE）
    if(e && e.stopPropagation){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
}
function setCartNum(num){
    var arrNum = ["e400", "e401", "e3fb", "e3fd", "e3fe", "e3ff"];
    var oNum = document.getElementsByClassName("sm_num");
    for(var a=0; a<oNum.length; a++){
        oNum[a].innerHTML = "&#x" + (arrNum[num - 2] || "e5d3") + ";";
        if(num-1 === 0) oNum[a].innerHTML = "";
    }
}
function my_utils(){
    var that = this;
    this.classList = function(item){
        var cn = item.className.animVal || item.className;
        return cn.split("\ ");
    };
    this.addClass = function (ele, name){
        var isSVG = false;
        if(ele.tagName === "svg"){
            isSVG = true;
        }
        if(ele && name){
            var cn = ele.className.animVal || ele.className;
            if(!cn){
                ele.className = name;
            }else if(cn.indexOf(name) === -1){
                if(isSVG) ele.setAttribute("class", cn.replace(/\s*$/,' '+name));
                else ele.className = cn.replace(/\s*$/,' '+name);
            }
        }
    };
    this.removeClass = function(ele, name){
        var reg1 = new RegExp('^\\s*\\b'+ name +'\\b\\s*$');
        var reg2 = new RegExp('^\\s*' + name+'\\b');
        var reg3 = new RegExp('\\b'+ name + '\\s*$');
        var reg4 = new RegExp('\\s*\\b'+name+'\\b\\s*');
        var isSVG = false;
        if(ele.tagName === "svg"){
            isSVG = true;
        }
        if(ele && name){
            var cn = ele.className.animVal || ele.className;
            var n_cn = "";
            if(cn && cn.indexOf(name) > -1){
                if(reg1.test(cn)){
                    n_cn = '';
                }else if(reg2.test(cn)){
                    n_cn = cn.replace(reg2,'');
                }else if(reg3.test(cn)){
                    n_cn = cn.replace(reg3,'');
                }else{
                    n_cn = cn.replace(reg4,' ');
                }
                if(isSVG) ele.setAttribute("class", n_cn);
                else ele.className = n_cn;
            }
        }
    };
    this.getBodyScrollTop = function(){
        var scrollpos = 0;
        if(window.pageYOffset){
            scrollpos = window.pageYOffset;
        }else if(document.compatMode && document.compatMode !== "BackCompat"){
            scrollpos = document.documentElement.scrollTop;
        }else if(document.body){
            scrollpos = document.body.scrollTop;
        }
        return scrollpos;
    };
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    this.scrollTo = function(element, to, duration){
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
    };
    this.scrollToTop = function(){
        var aScrollToTop = document.getElementsByClassName("scroll-to-top");
        for(var a=0; a<aScrollToTop.length; a++){
            aScrollToTop[a].onclick = function(){
                that.scrollTo(document.body, 0, 800);
                that.scrollTo(document.documentElement, 0, 800);
            }
        }
    };
    this.scrollToTop();
    // cookies
    this.setCookie = function(key, value, t){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+t);
        document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toUTCString();
        console.log(document.cookie)
        if(that.getCookie(key)){
            console.log('设置成功');
        }else{
            console.log('设置失败');
        }
    };
    this.getCookie = function(key){
        var str=document.cookie.replace(/;\s*/,';');
        var cookieArr=str.split(';');
        var cookieObj={};
        var len=cookieArr.length;
        for(var i=0; i<len; i++){
            var item=cookieArr[i];
            var k=item.split('=')[0];
            var v=item.split('=')[1];
            cookieObj[k]=v;
        }
        if(cookieObj[key]){
            return decodeURIComponent(cookieObj[key]);
        }else{
            return false;
        }
    };
    this.removeCookie = function(key){
        document.cookie=key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if(!that.getCookie(key)){
            console.log('删除成功');
        }else{
            console.log('删除失败');
        }
    };
    this.isIE = function () { //ie、Edge?
        return !!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1;
    };
}
function createRipple(obj, offset){
    var oLeft = offset?offset.x:0;
    var oTop = offset?offset.y:0;

    var obj_posAttr = getStyle(obj, "position");
    if(obj_posAttr === "absolute") return;
    obj.style.position = "relative";
    obj.style.overflow = "hidden";


    obj.addEventListener("touchstart", function(e){
        if(obj.getElementsByClassName("rippleObj").length !== 0) return;
        var group = searchList.getElementsByClassName("feature-content");
        for(var z=0; z<group.length; z++){
            my_utils.removeClass(group[z], "selected");
        }
        var rippleObj = document.createElement("div");
        my_utils.addClass(rippleObj, "rippleObj");
        obj.appendChild(rippleObj);
        my_utils.addClass(rippleObj, "scale");
        var json_posi = obj.getBoundingClientRect();
        var ripp_left = e.changedTouches[0].pageX - json_posi.left;
        var ripp_top = e.changedTouches[0].pageY - json_posi.top;
        var pageYoffset = my_utils.getBodyScrollTop();
        rippleObj.style.left = ripp_left - 100 + "px";
        rippleObj.style.top = (ripp_top - 100 - pageYoffset) + "px";

        obj.addEventListener("touchend", function(){
            obj.removeChild(rippleObj);
        }, {"passive": false})
        return false;
    }, {"passive": false});

    obj.onmousedown = function(e){
        if(obj.getElementsByClassName("rippleObj").length !== 0) return;
        var group = searchList.getElementsByClassName("feature-content");
        for(var z=0; z<group.length; z++){
            my_utils.removeClass(group[z], "selected");
        }
        var rippleObj = document.createElement("div");
        my_utils.addClass(rippleObj, "rippleObj");
        obj.appendChild(rippleObj);
        my_utils.addClass(rippleObj, "scale");
        rippleObj.style.left = (e.layerX - 100.5 + oLeft) + "px";
        rippleObj.style.top = (e.layerY - 100.5 + oTop) + "px";
        document.onmouseup = function(){
            obj.removeChild(rippleObj);
            document.onmouseup = null;
        }
    }
};
function embedToTop(targets, inputObj, fn){
    // var aToTop = document.getElementsByClassName("toTop");
    var aToTop = document.querySelectorAll(targets);
    for(var z=0; z<aToTop.length; z++){
        aToTop[z].onclick = function(){
            inputObj.value = this.parentNode.innerText;
            fn && fn();
        }
    }
};
function volSetRipple(selector, offset){
    if(!selector) return;
    var Cont = document.querySelectorAll(selector);
    for(var z=0; z<Cont.length; z++){
        createRipple(Cont[z], offset);
    }
};
function contributeFocus(name_attr){
    var ele = document.getElementsByName(name_attr)[0];
    var ele_ph = ele.parentNode.getElementsByClassName("place-holder")[0] || ele.parentNode.getElementsByClassName("place-holder-reg")[0];
    ele.onfocus = function(){
        my_utils.addClass(this.parentNode, "focus");
        my_utils.addClass(this.parentNode, "fill");
        classListExist(ele.parentNode, "failed") || (ele_ph.style.color = "#1a73e8");
        ELE.globalTimer.baseLogoTimer = 
        setTimeout(function(){
            new loading("reverse");
            clearTimeout(ELE.globalTimer.baseLogoTimer);
        }, 200)
    }
    ele.onblur = function(){
        this.value || my_utils.removeClass(this.parentNode, "focus");
        my_utils.removeClass(this.parentNode, "fill")
        classListExist(ele.parentNode, "failed") || (ele_ph.style.color = "#80868b");
    }
};
function putTip(judge, obj){
    var classes = ["pre", "isEmpty", "invalid", "error-format", "pass-isEmpty", "pass-wrong", "account-lost", "name-isRegistered", "nickname-isEmpty", "nickname-isOverflow", "pass-weak", "pass-notSame", "pass-invalid"];
    var errWords = obj.getElementsByClassName("err-words")[0];
    var ele_ph = obj.getElementsByClassName("place-holder")[0] || obj.getElementsByClassName("place-holder-reg")[0];
    for(var c=0; c<classes.length; c++){
        my_utils.removeClass(errWords, classes[c]);
    }
    !judge || (
        my_utils.addClass(obj, "failed") || 
        my_utils.addClass(errWords, judge) || 
        (ele_ph.style.color = "#d13239") ||
        obj.getElementsByTagName("input")[0].focus()
    )
    judge || (ele_ph.style.color = "#80868b");
    judge || my_utils.removeClass(obj, "failed");
}
function identifyID(val, exist_bool){
    var Res = [];
    var valstr = val.replace(/\ /g, "");
    valstr || Res.push("isEmpty");
    exist_bool === "PASS" ? Res.push("") : (
        exist_bool === false ? Res.push("account-lost") : 
        Res.push("account-had")
    );
    // exist_bool ? Res.push("account-had") : Res.push("account-lost");
    valstr.match(regExps["email"]) || Res.push("notEmail");
    // valstr.match(regExps["phone"]) || Res.push("notPhone");
    valstr.match(regExps["email"]) && Res.push("isEmail");
    // valstr.match(regExps["phone"]) && Res.push("isPhone");
    var resp = Res.indexOf("isEmpty") !== -1 ?
        "isEmpty": (
            Res.indexOf("isEmail") === -1 ?
            "invalid": (
                exist_bool ==="PASS" ? 
                "" : (
                    Res.indexOf("account-had") === -1 ?
                    "account-lost" : ""
                )

            )
        );
    var n_data = [];
    n_data.push(resp, Res);
    return n_data;
}
function identifyPass(val, exist_bool){
    var Res = [];
    val || Res.push("pass-isEmpty");
    exist_bool === "PASS" ? Res.push("") : (
        exist_bool === true ? Res.push("") : 
        Res.push("pass-wrong")
    );
    // exist_bool || Res.push("pass-wrong"); // 密码错误...
    var resp = Res.indexOf("pass-isEmpty") !== -1 ? 
        "pass-isEmpty": (
            Res.indexOf("pass-wrong") !== -1 ? 
            "pass-wrong": ""
        );
    return resp;
}
function identifyPassReg(val, val_){
    var Res = [];
    val || Res.push("1st-isEmpty");
    val_ || Res.push("2nd-isEmpty");
    val.replace(regExps["onlyEN_NUM"], "").replace(regExps["symbols"], "") && Res.push("1st-invalid");
    val_.replace(regExps["onlyEN_NUM"], "").replace(regExps["symbols"], "") && Res.push("2nd-invalid");
    val.length < 6 && Res.push("1st-weak");
    val_.length < 6 && Res.push("2nd-weak");
    val !== val_ && Res.push("pass-notSame");
    var resp = Res.indexOf("1st-isEmpty") !== -1 ?
    "pass-isEmpty" : (
        Res.indexOf("1st-invalid") !== -1 ? 
        "pass-invalid" : (
            Res.indexOf("1st-weak") !== -1 ?
            "pass-weak" : (
                Res.indexOf("pass-notSame") !== -1 ?
                "pass-notSame" : ""
            )
        )
    )
    var n_data = [];
    n_data.push(resp, Res);
    return n_data;
}
function loading(sign){
    var that = this;
    var forLoadingAni = ELE["logo-part"] ? ELE["logo-part"]["for-loading-ani"] : t;
    var loadingBox = ELE["logo-part"] ? ELE["logo-part"]["loading-box"] : t;
    var logoIcon = ELE["logo-part"] ? ELE["logo-part"]["logo-icon"] : t;
    this.setTimer = function(fn){
        ELE.globalTimer.logoTimer = setTimeout(function(){
            if(fn) fn();
            clearTimeout(ELE.globalTimer.logoTimer);
        }, 200);
    };
    this.setEle = function(ele, scaleRate){
        ele.style.transform = "scale(" + scaleRate +")";
    }
    sign === "reverse" ? (
        that.setEle(loadingBox, 0) ||
        that.setTimer(function(){
            my_utils.removeClass(forLoadingAni, "nowLoading");
            that.setEle(logoIcon, 1);
        })
    ) : (
        that.setEle(logoIcon, 0) || 
        that.setTimer(function(){
            my_utils.addClass(forLoadingAni, "nowLoading");
            that.setEle(loadingBox, 1);
        })
    );
}
function onoff_pass(obj, target){
    obj.addEventListener("mousedown", function(){
        my_utils.removeClass(this, "off");
        my_utils.addClass(this, "on");
        target.type = "text";
        this.addEventListener("mouseup", function(){
            my_utils.removeClass(this, "on");
            my_utils.addClass(this, "off");
            target.type = "password";
        })
    });
    obj.addEventListener("touchstart", function(){
        my_utils.removeClass(this, "off");
        my_utils.addClass(this, "on");
        target.type = "text";
        this.addEventListener("touchend", function(){
            my_utils.removeClass(this, "on");
            my_utils.addClass(this, "off");
            target.type = "password";
        }, {"passive": true});
    }, {"passive": true});
}
function contributeLinks(){
    var linkGroup = document.getElementsByClassName("newLink");
    for(var i=0; i<linkGroup.length; i++){
        var spans = linkGroup[i].getElementsByTagName("span");
        for(var j=0; j<spans.length; j++){
            spans[j].onclick = function(){
                var tmp_href = this.dataset.href || window.location.href;
                window.location = tmp_href;
            }
        }
    }
};
function getFocus(){
    var inputGroup = document.getElementsByTagName("input");
    for(var a=0; a<inputGroup.length; a++){
        !inputGroup[a].value || 
        classListExist(inputGroup[a].parentNode, "focus") || 
        my_utils.addClass(inputGroup[a].parentNode, "focus") ||
        (inputGroup[a].parentNode.getElementsByClassName("place-holder-reg")[0].style.color = "#5f6368");
    }
}
function trans2Arr(coll){
    let emptyArr = [];
    for(var x=0; x<coll.length; x++){
        emptyArr.push(coll[x]);
    }
    return emptyArr;
}
function removeInnerEle(tar){
    var nodeList = tar.childNodes;
    for(var i=nodeList.length-1; i>=0; i--){
        var x = tar.removeChild(nodeList[i]);
        if(x.nodeType === 1) x=null;
    }
}
function joint(json){
    var empty = [];
    for(var key in json){
        empty.push(key + "=" + json[key]);
    }
    return empty.join("&");
}
function unique(arr){
    var n_arr = [];
    for(var idx=0; idx<arr.length; idx++) n_arr.indexOf(arr[idx]) === -1 && n_arr.push(arr[idx]);
    return n_arr;
}
// === //
let warn = ["\u8b66\u544a\u000a\u0057\u0041\u0052\u004e\u0049\u004e\u0047\u0021\u003a", "\u4f7f\u7528\u6b64\u63a7\u5236\u53f0\u53ef\u80fd\u4f1a\u5bfc\u81f4\u653b\u51fb\u7a0b\u5e8f\u5229\u7528\u0020\u0053\u0065\u006c\u0066\u002d\u0058\u0053\u0053\u0020\u653b\u51fb\u5192\u5145\u60a8\u5e76\u7a83\u53d6\u60a8\u7684\u4fe1\u606f\u3002\u000a\u8bf7\u52ff\u8f93\u5165\u6216\u7c98\u8d34\u60a8\u4e0d\u660e\u767d\u7684\u4ee3\u7801\u3002\u000a\u0055\u0073\u0069\u006e\u0067\u0020\u0074\u0068\u0069\u0073\u0020\u0063\u006f\u006e\u0073\u006f\u006c\u0065\u0020\u006d\u0061\u0079\u0020\u0061\u006c\u006c\u006f\u0077\u0020\u0061\u0074\u0074\u0061\u0063\u006b\u0065\u0072\u0073\u0020\u0074\u006f\u0020\u0069\u006d\u0070\u0065\u0072\u0073\u006f\u006e\u0061\u0074\u0065\u0020\u0079\u006f\u0075\u0020\u0061\u006e\u0064\u0020\u0073\u0074\u0065\u0061\u006c\u0020\u0079\u006f\u0075\u0072\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u006f\u006e\u0020\u0075\u0073\u0069\u006e\u0067\u0020\u0061\u006e\u0020\u0061\u0074\u0074\u0061\u0063\u006b\u0020\u0063\u0061\u006c\u006c\u0065\u0064\u0020\u0053\u0065\u006c\u0066\u002d\u0058\u0053\u0053\u002e\u000a\u0044\u006f\u0020\u006e\u006f\u0074\u0020\u0065\u006e\u0074\u0065\u0072\u0020\u006f\u0072\u0020\u0070\u0061\u0073\u0074\u0065\u0020\u0063\u006f\u0064\u0065\u0020\u0074\u0068\u0061\u0074\u0020\u0079\u006f\u0075\u0020\u0064\u006f\u0020\u006e\u006f\u0074\u0020\u0075\u006e\u0064\u0065\u0072\u0073\u0074\u0061\u006e\u0064\u002e",
"color: red; background: yellow; font-size: 24px;", "color: black; font-size: 18px; background-color: #fff; padding: 10px 0; line-height: 1.75em"];
let C = {"log": function(S,s){console.log("%c"+S,s);return this;}, "clear": function(){console.clear();return this;}, "error": function(S){for(var x=0;x<S.split("\n").length;x++)console.error(S.split("\n")[x]);return this;}}
my_utils.isIE() ? C.clear().error(warn[0]).error(warn[1]) : C.log(warn[0],warn[2]).log(warn[1],warn[3]);
// === //