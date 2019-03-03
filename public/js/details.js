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
// Tab Case
function contributeTabBar(t_head, t_body){
    var that = this;
    var u_line = t_head.getElementsByClassName("u_line")[0];
    var u_before = u_line.getElementsByClassName("u_before")[0];
    var u_after = u_line.getElementsByClassName("u_after")[0];
    var tabList = t_head.getElementsByTagName("li");
    // var contentList = t_body.getElementsByClassName("tab_content");
    var gapPixel = 100;
    var leng = tabList.length;
    u_line.style.width = "calc(100% + " + (leng - 1)*gapPixel +"px)";
    var prev_Idx = 0;
    for(var tab_Idx = 0; tab_Idx<leng; tab_Idx++){
        tabList[tab_Idx].setAttribute("index", tab_Idx);
        tabList[tab_Idx].onclick = function(){
            var clickIdx = parseInt(this.getAttribute("index"));
            that.resetActive();
            tabList[clickIdx].setAttribute("class", "active");
            if(prev_Idx < clickIdx){
                u_before.style.transitionDelay = "150ms";
                u_after.style.transitionDelay = "10ms";
            }else{
                u_before.style.transitionDelay = "10ms";
                u_after.style.transitionDelay = "150ms";
            }
            that.lined(clickIdx);
            prev_Idx = clickIdx;
            // that.resetContent();
            // contentList[prev_Idx].classList.add("fade");
            // contentList[clickIdx].classList.add("enlarging");
        }
    }
    this.resetActive = function(){
        for(var i=0; i<tabList.length; i++){
            tabList[i].removeAttribute("class");
        }
    }
    this.resetContent = function(){
        for(var i=0; i<contentList.length; i++){
            contentList[i].classList.remove("fading");
            contentList[i].classList.remove("enlarging");
        }
    }
    this.lined = function(n){
        var gapN = -gapPixel*(leng - 1);
        var pixel_after = gapN + n*gapPixel;
        u_before.style.transform = "translateX(" + n*gapPixel + "px)";
        u_after.style.transform = "translateX(100%) translateX(" + pixel_after + "px)";
    }
    this.returnSign = function(__){
        var _ = "";
        __<0?_="-":_="+";
        return _;
    }
    this.lined(0);
    tabList[0].onclick();
}
const slogan = 
[
    {
        title: "第一张01234567",
        animation: "showHeaderTypo",
        sub: "这是第一张幻灯片的注释",
        bg: "./_test/0.png",
        icons_color: "#fff",
        strokeColor: "blue"
    },
    {
        title: "7654321灯片的注",
        animation: "jellyTypo",
        sub: "这是第二张幻灯片的注释",
        strokeColor: "#597FE0",
        bg: "./_test/1.png",
        icons_color: "#597FE0"
    },
    {
        title: "第一张01234567",
        animation: "stampTypo",
        sub: "这是第三张幻灯片的注释",
        color: "#000",
        strokeColor: "#fff",
        bg: "./_test/2.png",
        icons_color: "#fff"
    },
    {
        title: "7654321灯片的注",
        sub: "这是第四张幻灯片的注释",
        color: "#000",
        strokeColor: "#fff",
        bg: "./_test/3.png",
        icons_color: "#fff"
    }
];
function contributeCarousel(obj){
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
            }, 410);
            carIndis[0].classList.add("active");
            that.setWords(slogan[0].title);
            // sub_title.innerText = slogan[0].sub || "";
            // m_container.style.color = slogan[0].color || "#fff";
            // m_container.style["-webkit-text-stroke-color"] = slogan[0].strokeColor || "transparent";
        }
        carIndis[that.count] && carIndis[that.count].classList.add("active");
        slogan[that.count] && that.setWords(slogan[that.count].title);
        // if(slogan[that.count]){
            // sub_title.innerText = slogan[that.count].sub || "";
            // m_container.style.color = slogan[that.count].color || "#fff";
            // m_container.style["-webkit-text-stroke-color"] = slogan[that.count].strokeColor || "transparent";
        // }
    }
    // this.removeBling = function(){
    //     for(var n=0; n<ani_words.length; n++){
    //         ani_words[n].classList.remove("bling");
    //     }
    // }
    // this.recoverBling = function(){
    //     for(var n=0; n<ani_words.length; n++){
    //         ani_words[n].classList.add("bling");
    //     }
    // }
    this.setWords = function(str_w){
        // m_container.innerHTML = "";
        for(var o=0; o<str_w.length; o++){
            let n_span = document.createElement("span");
            n_span.innerText = str_w[o];
            // m_container.appendChild(n_span);
        }
    }
    var carousel_outer = obj.getElementsByClassName("carousel_outer")[0];
    for(var i=0; i<slogan.length; i++){
        let n_item = document.createElement("div");
        n_item.classList.add("carousel_item");
        n_item.style.backgroundImage =  "url(" + slogan[i].bg + ")";
        carousel_outer.appendChild(n_item);
    }
    var that = this;
    var carList = carousel_outer.getElementsByClassName("carousel_item");
    var carIndi = obj.getElementsByClassName("carousel_indi")[0];
    // var m_container = obj.getElementsByClassName("m_container")[0];
    // var sub_title = obj.getElementsByClassName("sub_title")[0];
    // var ani_words = m_container.getElementsByTagName("span");
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
        }
    }
    carIndis[0].classList.add("active");
    carousel_outer.appendChild(carList[0].cloneNode());
    carList = carousel_outer.getElementsByClassName("carousel_item");
    carousel_outer.style.width = carList.length + "00%";
    this.count = 0;
    this.timer = setInterval(function(){
        that.count++;
        that.MoveTo(that.count);
        // that.recoverBling();
    }, 5500);
    this.MoveTo(0);
    this.setWords(slogan[0].title);
    // this.recoverBling();
    obj.onmouseover = function(){
        clearInterval(that.timer);
        // that.removeBling();
    }
    obj.onmouseout = function(){
        clearInterval(that.timer);
        that.timer = setInterval(function(){
            that.count++;
            that.MoveTo(that.count);
            // that.recoverBling();
        }, 5500);
    }

    // mobile
    // let event = new Event("touchmove", {"cancelable": false});
    var position = {
        "xStart": 0,
        "xMove": 0,
        "xEnd": 0,
        "shift": 0
    };
    var itemWidth = parseFloat(getStyle(carousel_outer, "width"))/carList.length;
    obj.addEventListener("touchstart", function(event){
        clearInterval(that.timer);
        // that.removeBling();
        carousel_outer.style.transitionProperty = "none";
        position.xStart = event.changedTouches[0].clientX;
        if(that.count === 0) carousel_outer.style.transform = "translateX(" + -itemWidth*(carList.length - 1) + "px)";
        return false;
    }, {"passive": true});
    obj.addEventListener("touchmove", function(event){
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
        // if(position.shift<0){
        //     swift = -(itemWidth*that.count + abs_shift);
        // }else{
        //     swift = that.count === 0?-(itemWidth*(carList.length - 1) - abs_shift):-(itemWidth*that.count - abs_shift);
        // }
        return false;
    }, {"passive": true});
    obj.addEventListener("touchend", function(event){
        position.xEnd = event.changedTouches[0].clientX;
        carousel_outer.style.transitionProperty = "transform";
        if(Math.abs(position.shift)>(itemWidth/8) || that.count == 0){
            position.shift>0?that.count--:that.count++;
            if(that.count === -1)that.count = carList.length-2;
        }
        position.shift !== 0 && that.MoveTo(that.count);
        position.shift = 0;
        return false;
    }, {"passive": true});
}
const scrollLength = parseFloat(getStyle(document.body, "height")) - parseFloat(getStyle(menu_box, "height"));
const topGap = 125;
var page_shell = document.getElementById("page-shell");
var page_pro_gress_bar = document.getElementById("page-progress-bar");

window.onload = function(){
    setMenuBtnColor("#000");
    prev_menuBtnColor = "#000";
    new contributeTabBar(document.getElementById("tab_case"), );
    new contributeCarousel(document.getElementById("carousel_scroll"));
    volSetRipple(".tag-te .md-ico");
}
window.onscroll = function(){
    var p_y = my_utils.getBodyScrollTop();
    page_pro_gress_bar.style.transform = "translateX(" + (p_y/scrollLength*100) + "%)";
    p_y >= 125 && my_utils.addClass(page_shell, "slideDown");
    p_y < 125 && my_utils.removeClass(page_shell, "slideDown");
    console.log(p_y)
}