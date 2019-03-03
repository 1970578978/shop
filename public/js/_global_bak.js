// Carousel
const slogan = 
[
    {
        title: "第一张01234567",
        animation: "showHeaderTypo",
        sub: "这是第一张幻灯片的注释",
        bg: "./_test/0.gif",
        icons_color: "#fff",
        strokeColor: "blue"
    },
    {
        title: "7654321灯片的注",
        animation: "jellyTypo",
        sub: "这是第二张幻灯片的注释",
        strokeColor: "#597FE0",
        bg: "./_test/1.gif",
        icons_color: "#597FE0"
    },
    {
        title: "第一张01234567",
        animation: "stampTypo",
        sub: "这是第三张幻灯片的注释",
        color: "#000",
        strokeColor: "#fff",
        bg: "./_test/2.gif",
        icons_color: "#fff"
    },
    {
        title: "7654321灯片的注",
        sub: "这是第四张幻灯片的注释",
        color: "#000",
        strokeColor: "#fff",
        bg: "./_test/3.gif",
        icons_color: "#fff"
    }
];
var header_banner = document.getElementById("header-banner");
var n_carousel = document.getElementById("carousel_scroll");
var my_account = document.getElementById("my_account");
var menu_button = document.getElementById("menu_button");
var my_cart = document.getElementById("my_cart");
var search_bar = document.getElementById("search_bar");
var search_panel = document.getElementById("search_panel");
var menu_lists = document.getElementById("menu_lists");
var menu_box = document.getElementById("menu-box");
var mdSearchIco = document.getElementById("md-search-ico");
var mdSearch = document.getElementById("md-search");
var mdSearchBox = document.getElementsByClassName("md-search-box")[0];
var mdbtnSearch = document.getElementById("btn-search");
var smSearchList = document.getElementById("sm-search_part");
var max_list_size = 6;
var my_utils = new my_utils();
window.onload = function(){
    var n_CC = new contributeCarousel(n_carousel);
    var cartList = document.getElementById("cart-list");
    refreshCart();
    function refreshCart(){
        var num = cartList.getElementsByClassName("menu-item").length;
        setCartNum(num);
        if(num > max_list_size+1) my_utils.addClass(cartList, "full");
        else my_utils.removeClass(cartList, "full");
        if(num === 1) my_utils.addClass(cartList, "isempty");
        else my_utils.removeClass(cartList, "isempty");
    };
    menu_button.onclick = function(){
        var that = this;
        if(classListExist(menu_button, "active")){
            my_utils.removeClass(that, "active");
            classListExist(search_panel, "flip") && my_utils.removeClass(search_panel, "flip");
            classListExist(menu_box, "flip") && my_utils.removeClass(menu_box, "flip");
            header_banner.style.position = "absolute";
            document.body.style.overflow = "auto";
        }else{
            my_utils.addClass(that, "active");
            my_utils.addClass(menu_box, "flip");
            header_banner.style.position = "fixed";
            document.body.style.overflow = "hidden";
        }
    };
    (function forRemoveItem(){
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
    })();
    function classListExist(obj, val){
        var bool = false;
        var cl = my_utils.classList(obj);
        for(var x=0; x<cl.length; x++){
            if(cl[x] === val){bool = true; break;}
        }
        return bool;
    }
    my_cart.onclick = function(e){
        stopBubble(e);
        my_utils.removeClass(mdSearchBox, "fall");
        my_utils.removeClass(searchList, "fall");
        if(classListExist(cartList, "slidedown")){hide_cart_list();}
        else{show_cart_list();}
        refreshCart();
    }
    function show_cart_list(){
        cartList.style.display = "block";
        my_utils.addClass(cartList, "slidedown");
    }
    function hide_cart_list(){
        my_utils.removeClass(cartList, "slidedown");
        cartList.style.display = "none";
    }
    document.onclick = function(e){
        stopBubble(e);
        classListExist(cartList, "slidedown") && hide_cart_list();
    }
    cartList.onclick = function(e){
        stopBubble(e);
    }
    search_bar.onfocus = function(){
        search_panel.style.display = "block";
        classListExist(menu_box, "flip") || my_utils.addClass(search_panel, "flip");
        my_utils.addClass(menu_button, "active");
        
        var pathGroup = menu_button.getElementsByTagName("path");
        for(var i=0; i<pathGroup.length; i++){
            pathGroup[i].style.stroke = "#636161";
        }
        header_banner.style.position = "fixed";
        document.body.style.overflow = "hidden";
    }
    function contributeCarousel(obj){
        this.setMenuColor = function(str){
            if(classListExist(menu_button, "active")) return 0;
            var pathGroup = menu_button.getElementsByTagName("path");
            var menulistGroup = menu_lists.getElementsByTagName("a");
            for(var i=0; i<pathGroup.length; i++){
                pathGroup[i].style.stroke = str;
            }
            for(var j=0; j<menulistGroup.length; j++){
                if(slogan[that.count]){
                    menulistGroup[j].style.color = slogan[that.count].icons_color;
                }else{
                    menulistGroup[j].style.color = slogan[0].icons_color;
                }
            }
            mdSearchIco.style.fill = slogan[that.count]?slogan[that.count].icons_color:slogan[0].icons_color;
        }
        this.removeActive = function(){
            for(var m=0; m<carIndis.length; m++){
                carIndis[m].removeAttribute("class");
            }
        }
        this.MoveTo = function(num){
            that.removeActive();
            if(carousel_outer.style.transitionProperty === "none"){
                carousel_outer.style.transitionProperty = "transform";
            }
            carousel_outer.style.transform = "translateX(-" + num/carList.length*100 + "%)";
            if(num == carList.length - 1){
                var tmp_timer = setTimeout(function(){
                    carousel_outer.style.transitionProperty = "none";
                    carousel_outer.style.transform = "translateX(0)";
                    that.count = 0;
                    clearTimeout(tmp_timer);
                }, 400);
                my_utils.addClass(carIndis[0], "active");
                that.setWords(slogan[0].title);
                sub_title.innerText = slogan[0].sub || "";
                m_container.style.color = slogan[0].color || "#fff";
                m_container.style["-webkit-text-stroke-color"] = slogan[0].strokeColor || "transparent";
                my_account.style.color = slogan[0].icons_color || "#fff";
                my_cart.style.color = slogan[0].icons_color || "#fff";
                that.setMenuColor(slogan[0].strokeColor)
            }
            carIndis[that.count] && my_utils.addClass(carIndis[that.count], "active");
            slogan[that.count] && that.setWords(slogan[that.count].title);
            if(slogan[that.count]){
                sub_title.innerText = slogan[that.count].sub || "";
                m_container.style.color = slogan[that.count].color || "#fff";
                m_container.style["-webkit-text-stroke-color"] = slogan[that.count].strokeColor || "transparent";
                my_account.style.color = slogan[that.count].icons_color || "#fff";
                my_cart.style.color = slogan[that.count].icons_color || "#fff";
                that.setMenuColor(slogan[that.count].strokeColor);
            }
        }
        this.removeBling = function(){
            for(var n=0; n<ani_words.length; n++){
                my_utils.removeClass(ani_words[n], "bling");
                ani_words[n].style.opacity = "1";
            }

        }
        this.recoverBling = function(){
            for(var n=0; n<ani_words.length; n++){
                my_utils.addClass(ani_words[n], "bling");
            }
        }
        this.setWords = function(str_w){
            m_container.innerHTML = "";
            for(var o=0; o<str_w.length; o++){
                let n_span = document.createElement("span");
                if(that.count === slogan.length){
                    n_span.style.animationName = slogan[0].animation || "showHeaderTypo";
                }else{
                    n_span.style.animationName = slogan[that.count].animation || "showHeaderTypo";
                }
                n_span.innerText = str_w[o];
                m_container.appendChild(n_span);
            }
        }
        var carousel_outer = obj.getElementsByClassName("carousel_outer")[0];
        for(var i=0; i<slogan.length; i++){
            let n_item = document.createElement("div");
            my_utils.addClass(n_item, "carousel_item");
            n_item.style.backgroundImage =  "url(" + slogan[i].bg + ")";
            carousel_outer.appendChild(n_item);
        }
        var that = this;
        var carList = carousel_outer.getElementsByClassName("carousel_item");
        var carIndi = obj.getElementsByClassName("carousel_indi")[0];
        var m_container = obj.getElementsByClassName("m_container")[0];
        var sub_title = obj.getElementsByClassName("sub_title")[0];
        var ani_words = m_container.getElementsByTagName("span");
        var carIndis = [];
        for(var l=0; l<carList.length; l++){
            carList[l].style.width = 1/(carList.length + 1)*100 + "%";
            let newLi = document.createElement("li");
            let newSpan = document.createElement("span");
            newSpan.dataset.indi = l;
            carIndis.push(newSpan);
            newLi.appendChild(newSpan);
            carIndi.appendChild(newLi);
            newSpan.onclick = function(){
                that.count = this.dataset.indi;
                that.removeActive();
                that.MoveTo(this.dataset.indi);
                that.removeBling();
            }
        }
        my_utils.addClass(carIndis[0], "active");
        carousel_outer.appendChild(carList[0].cloneNode());
        carList = carousel_outer.getElementsByClassName("carousel_item");
        carousel_outer.style.width = carList.length + "00%";
        this.count = 0;
        this.timer = setInterval(function(){
            that.count++;
            that.MoveTo(that.count);
            that.recoverBling();
        }, 5500);
        this.MoveTo(0);
        this.setWords(slogan[0].title);
        this.recoverBling();
        obj.onmouseover = function(){
            clearInterval(that.timer);
            that.removeBling();
        }
        obj.onmouseout = function(){
            clearInterval(that.timer);
            that.timer = setInterval(function(){
                that.count++;
                that.MoveTo(that.count);
                that.recoverBling();
            }, 5500);
        }
        var position = {
            "xStart": 0,
            "xMove": 0,
            "xEnd": 0,
            "shift": 0
        };
        var itemWidth = parseFloat(getStyle(carousel_outer, "width"))/carList.length;
        obj.addEventListener("touchstart", function(event){
            clearInterval(that.timer);
            that.removeBling();
            carousel_outer.style.transitionProperty = "none";
            position.xStart = event.changedTouches[0].clientX;
            if(that.count === 0) carousel_outer.style.transform = "translateX(" + -itemWidth*(carList.length - 1) + "px)";
            return false;
        }, {"passive": true});
        obj.addEventListener("touchmove", function(event){
            event.preventDefault();
            position.xMove = event.changedTouches[0].clientX;
            position.shift = position.xMove - position.xStart;
            var abs_shift = Math.abs(position.shift);
            var swift = position.shift<0?
                -(itemWidth*that.count + abs_shift):
                (
                    that.count === 0?
                    -(itemWidth*(carList.length - 1) - abs_shift):
                    -(itemWidth*that.count - abs_shift)
                );
            carousel_outer.style.transform = "translateX(" + swift + "px)";
            return false;
        }, {"passive": false});
        obj.addEventListener("touchend", function(event){
            position.xEnd = event.changedTouches[0].clientX;
            carousel_outer.style.transitionProperty = "transform";
            if(Math.abs(position.shift)>(itemWidth/8) || that.count == 0){
                position.shift>0?that.count--:that.count++;
                if(that.count === -1)that.count = carList.length-2;
            }
            position.shift !== 0 && that.MoveTo(that.count);
            position.shift = 0;
            that.removeBling();
            clearInterval(that.timer);
            that.timer = setInterval(function(){
                that.count++;
                that.MoveTo(that.count);
                that.recoverBling();
            }, 5500);
            return false;
        }, {"passive": true});
        
    }
    window.onresize = function(){
        if(document.body.clientWidth >= 768 && search_panel.className === "search_panel flip"){
            my_utils.removeClass(menu_button, "active");
            my_utils.removeClass(search_panel, "flip");
            my_utils.removeClass(cartList, "slidedown");
        }else if(document.body.clientWidth >= 768 && classListExist(menu_box, "flip")){
            my_utils.removeClass(menu_button, "active");
            my_utils.removeClass(menu_box, "flip");
        }
        else{
            cartList.style.display = "none";
        }
    }
}
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
    }
    this.scrollToTop();
    
}
var searchList = document.getElementById("search-list");
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
}
function embedToTop(targets, inputObj, fn){
    // var aToTop = document.getElementsByClassName("toTop");
    var aToTop = document.querySelectorAll(targets);
    for(var z=0; z<aToTop.length; z++){
        aToTop[z].onclick = function(){
            inputObj.value = this.parentNode.innerText;
            fn && fn();
        }
    }
}
function volSetRipple(selector, offset){
    if(!selector) return;
    var Cont = document.querySelectorAll(selector);
    for(var z=0; z<Cont.length; z++){
        createRipple(Cont[z], offset);
    }
}
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
// ----- !!!! ----- //
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
