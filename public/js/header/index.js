// Carousel
// const slogan = 
// [
//     {
//         title: "第一张01234567",
//         animation: "showHeaderTypo",
//         sub: "这是第一张幻灯片的注释",
//         bg: "./_test/0.png",
//         icons_color: "#fff",
//         strokeColor: "blue"
//     },
//     {
//         title: "7654321灯片的注",
//         animation: "jellyTypo",
//         sub: "这是第二张幻灯片的注释",
//         strokeColor: "#597FE0",
//         bg: "./_test/1.png",
//         icons_color: "#597FE0"
//     },
//     {
//         title: "第一张01234567",
//         animation: "stampTypo",
//         sub: "这是第三张幻灯片的注释",
//         color: "#000",
//         strokeColor: "#fff",
//         bg: "./_test/2.png",
//         icons_color: "#fff"
//     },
//     {
//         title: "7654321灯片的注",
//         sub: "这是第四张幻灯片的注释",
//         color: "#000",
//         strokeColor: "#fff",
//         bg: "./_test/3.png",
//         icons_color: "#fff"
//     }
// ];
window.onload = function(){
    my_utils.Ajax({
        method: "GET",
        url: "http://shop.com/api/carousel_map",
        success: function(data){
            console.log(JSON.parse(data))
            // new contributeCarousel(document.getElementById("carousel_scroll"), JSON.parse(data));
        }
    })
    prev_menuBtnColor = "#fff";
}
function contributeCarousel(obj, slogan){
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
            that.setMenuColor(slogan[0].strokeColor);
            prev_menuBtnColor = slogan[0].icons_color || "#fff";
        }
        carIndis[that.count] && my_utils.addClass(carIndis[that.count], "active");
        slogan[that.count] && that.setWords(slogan[that.count].title);
        if(slogan[that.count]){
            sub_title.innerText = slogan[that.count].sub || "";
            m_container.style.color = slogan[that.count].color || "#fff";
            m_container.style["-webkit-text-stroke-color"] = slogan[that.count].strokeColor || "transparent";
            my_account.style.color = slogan[that.count].icons_color || "#fff";
            my_cart.style.color = slogan[that.count].icons_color || "#fff";
            prev_menuBtnColor = slogan[that.count].icons_color || "#fff";
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