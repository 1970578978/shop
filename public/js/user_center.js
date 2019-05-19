window.onload = function(e){
    volSetRipple(".panel-body");
    setMenuBtnColor("#000");
    prev_menuBtnColor = "#000";
    fitMenu();
    console.log(ELE["boolMenuList"]);
    trans2Arr(new contributeTabBar(document.getElementById("tab_case"), document.getElementById("tab_container"))).myForEach(function(item, idx){
        ELE["selections"][idx+1].addEventListener("click", function(){
            item.onclick();
        });
    });
    new contributeTabBar(document.getElementById("tab_case_"), document.getElementById("tab_container_"))
    ELE["aside-list"][4].onclick();
};
window.addEventListener("resize", function(){
    fitMenu();
});
var ELE = {
    "sort-by-btn": document.getElementById("sort-by"),
    "selectionTitle": document.getElementsByClassName("selection")[0],
    "under-selection": document.getElementsByClassName("under-selection")[0],
    "selections": trans2Arr(document.getElementsByClassName("under-selection-list")),
    "aside-list": trans2Arr(document.getElementsByClassName("aside-list")),
    "content-container": trans2Arr(document.getElementsByClassName("content-container")),
    "aside-menu": document.getElementsByClassName("aside-menu")[0],
    "for-user-tip": document.getElementsByClassName("for-user-tip")[0],
    "boolMenuList": [],
    "b_selections": [],
    "_orderForm": document.getElementById("_orderForm"),
    "multi-line": document.getElementById("multi-line"),
    "header-banner": document.getElementById("header-banner")
};
ELE["content-container"].myForEach(function(item, idx){
    item.onscroll = function(){
        this.scrollTop ? my_utils.removeClass(ELE["header-banner"], "topped") : my_utils.addClass(ELE["header-banner"], "topped");
    }
});
ELE["aside-list"].myForEach(function(item, idx){
    ELE["boolMenuList"][idx] = false;
    ELE["boolMenuList"][0] = true;

    item.onclick = function(){
        fetchInfoData(item);
        idx === 6 && ELE["multi-line"].focus();
    }
});
ELE["sort-by-btn"].onclick = function(e){
    stopBubble(e);
    classListExist(ELE["under-selection"], "shown") ? my_utils.removeClass(ELE["under-selection"], "shown") : my_utils.addClass(ELE["under-selection"], "shown");
};
ELE["_orderForm"].onclick = function(e){
    stopBubble(e);
    my_utils.removeClass(ELE["under-selection"], "shown");
};
ELE["multi-line"].addEventListener("focus", function(){
    my_utils.addClass(this.parentNode.parentNode, "focused");
});
ELE["multi-line"].addEventListener("blur", function(){
    ELE["multi-line"].value.length || my_utils.removeClass(this.parentNode.parentNode, "focused");
});
for(var a=0; a<ELE["selections"].length; ELE["b_selections"][++a] = false){
    console.log(a)
    classListExist(ELE["selections"][a], "active") && (ELE["b_selections"][a] = true);
};
console.log(ELE["b_selections"]);
ELE["selections"].myForEach(function(item, idx){
    item.onclick = function(){
        if(idx === 0) return;
        ELE["b_selections"].myForEach(function(b, i){
            b && my_utils.removeClass(ELE["selections"][i], "active");
            b && (ELE["b_selections"][i] = false);
            b && my_utils.addClass(item, "active");
        });
        ELE["b_selections"][idx] = true;
        console.log(ELE["b_selections"]);
        console.log(idx);
    }
});
function contributeTabBar(t_head, t_body){
    var that = this;
    var u_line = t_head.getElementsByClassName("u_line")[0];
    var u_before = u_line.getElementsByClassName("u_before")[0];
    var u_after = u_line.getElementsByClassName("u_after")[0];
    var tabList = t_head.getElementsByTagName("li");
    var contentList = t_body.getElementsByClassName("tab_content");
    var gapPixel = 65;
    var leng = tabList.length;
    u_line.style.width = "calc(100% + " + (leng - 1)*gapPixel +"px)";
    var prev_Idx = 0;
    for(var tab_Idx = 0; tab_Idx<leng; tab_Idx++){
        tabList[tab_Idx].setAttribute("index", tab_Idx);
        tabList[tab_Idx].onclick = function(){
            ELE["selectionTitle"].innerHTML = this.innerText;
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
            that.resetContent();
            contentList[prev_Idx].classList.add("fade");
            contentList[clickIdx].classList.add("enlarging");
        };
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
    return tabList;
};
function fetchInfoData(item){
    var loading = new Object();
    var loading_cover = document.querySelector(".loading-cover");
    loading.start = function(){
        my_utils.addClass(loading_cover, "nowLoading");
    };
    loading.close = function(){
        for(var i=0; i<ELE["aside-list"].length; ELE["boolMenuList"][i++] = false) /* empty */;
        ELE["boolMenuList"][ELE["aside-list"].indexOf(item)] = true;
        ELE["boolMenuList"].myForEach(function(b, i){
            b ? my_utils.addClass(ELE["aside-list"][i], "active") : my_utils.removeClass(ELE["aside-list"][i], "active");
            b ? my_utils.addClass(ELE["content-container"][i], "active") : my_utils.removeClass(ELE["content-container"][i], "active");
        });
        var timeout = null;
        timeout = setTimeout(function(){
            clearTimeout(timeout);
            my_utils.removeClass(loading_cover, "nowLoading");
        }, 500);
    };
    // loading.start();
    AjaxRequest.post({
        "url": "http://127.0.0.1:2121/",
        "onSuccess": function(req){
            var data = JSON.parse(req.responseText);
            console.log(data);
            loading.close();
        },
        "onError": function(req){
            var err = JSON.parse(req.responseText);
            console.error(err);
        }
    });
}
function fitMenu(){
    if(document.body.clientWidth >= 992){
        ELE["aside-menu"].style.width = "auto";
        ELE["for-user-tip"].innerText = "选择左方菜单中的选项，以查看或编辑相应内容。"
    }
    else{
        ELE["for-user-tip"].innerText = "选择上方菜单中的选项，以查看或编辑相应内容。"
        var totalWidth = 0;
        ELE["aside-list"].myForEach(function(item){
            totalWidth += parseFloat(getStyle(item, "width")) + 21;
        });
        ELE["aside-menu"].style.width = totalWidth + "px";
    }
}