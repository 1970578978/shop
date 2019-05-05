var content = [
    {
        "day": "2019年5月3日",
        "hry_list": [
            {"time": "上午10:55", "type": "veg", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-3-0"},
            {"time": "上午10:30", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-3-1"},
            {"time": "上午10:29", "type": "veg", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-3-2"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-3-3"}
        ],
        "today": true
    },
    {
        "day": "2019年5月2日",
        "hry_list": [
            {"time": "上午10:55", "type": "fru", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-2-0"},
            {"time": "上午10:54", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-2-1"},
            {"time": "上午10:53", "type": "fru", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-2-2"},
            {"time": "上午10:52", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-2-3"}
        ]
    },
    {
        "day": "2019年5月1日",
        "hry_list": [
            {"time": "上午10:55", "type": "fru", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-1-0"},
            {"time": "上午10:54", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-1-1"},
            {"time": "上午10:53", "type": "fru", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-1-2"},
            {"time": "上午10:52", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-1-3"}
        ]
    }
];
window.onload = function(){
    // var loading_cover = document.querySelector(".loading-cover");
    // my_utils.addClass(loading_cover, "nowLoading");
    AjaxRequest.post({
        "url": "http://127.0.0.1:2121",
        "onSuccess": function(req){
            var data = JSON.parse(req.responseText);
            for(var x=0; x<data.length; x++){
                ELE["shelf-container"].appendChild(mk_History_day_group(data[x]));
            };
            // my_utils.removeClass(loading_cover, "nowLoading");
            console.log(data);
            ELE["shelf-container"].getElementsByClassName("md-shelf").length === 0 && my_utils.addClass(ELE["shelf-container"], "empty");
        },
        "onError": function(req){
            var data = content;
            for(var x=0; x<data.length; x++){
                ELE["shelf-container"].appendChild(mk_History_day_group(data[x]));
            }
            console.log(data);
        }
    });
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
    "shelf-container": document.getElementsByClassName("shelf-container")[0],
    "items-total": document.getElementsByClassName("items-total")[0],
    "close_": document.getElementsByClassName("close_")[0],
    "cancel_": document.getElementsByClassName("cancel_")[0],
    "delete_selected_": document.getElementsByClassName("delete_selected_")[0],
    "nav-scroll-outer": document.getElementById("nav-scroll-outer"),
    "navigate_to_": document.getElementById("navigate_to_"),
    "delete_item_": document.getElementById("delete_item_"),
    "checkedArr": [], // 存放复选框的 ID { String }
    "singleCheckedItem": [] // 存放单个要删除的 ID
};
ELE["close_"].onclick = ELE["cancel_"].onclick = function(){
    my_utils.removeClass(ELE["nav-scroll-outer"], "scroll_");
    for(var a=0; a<ELE["checkedArr"].length; a++){
        document.getElementById(ELE["checkedArr"][a]).checked = false;
    };
    ELE["checkedArr"].splice(0);
};
ELE["selection_bg"].onclick = function(e){
    stopBubble(e);
    this.style.visibility = "hidden";
    ELE["items-total"].innerText = ELE["checkedArr"].length;
    ELE["checkedArr"].length === 0 && my_utils.removeClass(ELE["nav-scroll-outer"], "scroll_");
};
ELE["lv2-container"].onscroll = function(){
    this.scrollTop ? my_utils.removeClass(ELE["lv2-nav"], "topped") : my_utils.addClass(ELE["lv2-nav"], "topped");
    ELE["selection_bg"].onclick();
};
ELE["dia-box"].onclick = function(e){
    stopBubble(e);
};
ELE["dia_bg"].onclick = function(e){
    my_utils.removeClass(this, "show_dia");
};
ELE["delete_item_"].onclick = function(e){
    stopBubble(e);
    optimizePage(ELE["singleCheckedItem"]);
    ELE["checkedArr"].splice(ELE["checkedArr"].indexOf(ELE["singleCheckedItem"])[0], 1);
    ELE["selection_bg"].onclick();
};
ELE["navigate_to_"].onclick = function(e){
    stopBubble(e);
    var href = document.getElementById(ELE["checkedArr"][0]).parentNode.parentNode.querySelector("a").href;
    ELE["selection_bg"].onclick();
    window.open(href);
};
window.addEventListener("resize", function(){
    ELE["selection_bg"].onclick();
});
ELE["delete_selected_"].onclick = function(){
    setDialog({
        "title": "移除所选项",
        "content": '<p>确定要从历史记录中删除这些浏览记录吗？</p>',
        "footer": [
            {
                "label": "取消",
                "fn": function(){
                    ELE["dia_bg"].onclick();
                }
            },
            {
                "label": "删除",
                "fn": function(){
                    optimizePage(ELE["checkedArr"]);
                    ELE["items-total"].innerText = ELE["checkedArr"].length
                    my_utils.removeClass(ELE["nav-scroll-outer"], "scroll_");
                    ELE["checkedArr"].splice(0);
                }
            }
        ]
    });
    my_utils.addClass(ELE["dia_bg"], "show_dia");
};
function optimizePage(arr__){ // 检查列表是否为空，优化页面结构
    for(var i=0; i<arr__.length; i++){
        var target = document.getElementById(arr__[i]);
        var x = target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
        console.log("刚才删除的项目 \u001b[34m%s", arr__[i]);
        if(x.nodeType === 1) x=null;
    };
    var oSHELF_TITLE = document.querySelectorAll(".shelf-title");
    for(var j=0; j<oSHELF_TITLE.length; j++){
        var OUTER = oSHELF_TITLE[j].parentNode;
        if(OUTER.getElementsByClassName("shelf-body").length === 0){
            var y = OUTER.parentNode.removeChild(OUTER);
            if(y.nodeType === 1) y=null;
        }
    };
    ELE["shelf-container"].getElementsByClassName("md-shelf").length === 0 && my_utils.addClass(ELE["shelf-container"], "empty");
    // arr__.splice(0);
    ELE["dia_bg"].onclick();
    // ELE["close_"].onclick();
};
function setSelctionMoreBtn(){
    // 建议在此方法前 清除子元素
    ELE["selction_items"] = {};

    ELE["selection_bg"].style.visibility = "visible";
};
function mk_History_day_group(array){
    var img_attr = {"veg": {"alt": "蔬类", "title": "蔬类"}, "fru": {"alt": "水果", "title": "水果"}, "snack": {"alt": "零食", "title": "其他零食类"}};
    var fn_mk_shelf_body = function(json){
        var oDiv = document.createElement("div");
        oDiv.className = "shelf-body";
        oDiv.innerHTML = '<div class="check-box flex-center">' + '<input class="hidden-xs-up" id="' + json["id"] + '" type="checkbox" name="cart-list"><label class="cbx" for="' + json["id"] + '"></label></div>' +
            '<div class="time-label "><span class="md-text-setting">' + json["time"] + '</span></div>' + '<div class="kind-icon flex-center">' +
            '<img src="./img/history_icons/' + json["type"] + '.svg" alt="' + img_attr[json["type"]]["alt"] + '" title="种类：' + img_attr[json["type"]]["title"] + '">' +
            '</div>' + '<div class="shelf-name">' + '<a class="md-text-setting" href="' + json["url"] + '" title="' + json["label"] + '">' + json["label"] + '</a></div>' +
            '<div class="shelf-opt">' + '<i class="md-ico">&#xe5d4;</i></div></div>';
        var checkBox = oDiv.querySelector("label.cbx");
        checkBox.onclick = function(){
            var checkBoxId = this.getAttribute("for");
            var tmp_idx = ELE["checkedArr"].indexOf(checkBoxId);
            tmp_idx != -1 ? ELE["checkedArr"].splice(tmp_idx, 1) : ELE["checkedArr"].push(checkBoxId);
            ELE["checkedArr"].length === 0 ? my_utils.removeClass(ELE["nav-scroll-outer"], "scroll_") : my_utils.addClass(ELE["nav-scroll-outer"], "scroll_");
            ELE["items-total"].innerText = ELE["checkedArr"].length;
        };
        var moreBtn = oDiv.querySelector(".shelf-opt i.md-ico");
        moreBtn.onclick = function(){
            ELE["selection_bg"].style.visibility = "visible";
            var moveTar = document.getElementsByClassName("full-screen-menu")[0];
            var rectVal = this.getBoundingClientRect();
            moveTar.style.top = rectVal.top + "px";
            var tar_right = parseFloat(getStyle(moveTar, "right"));
            var tar_bottom = parseFloat(getStyle(moveTar, "bottom"));
            var tar_width = !isNaN(parseFloat(getStyle(moveTar, "width"))) ? parseFloat(getStyle(moveTar, "width")) : 20;
            var tar_height = parseFloat(getStyle(moveTar, "height"));
            tar_bottom < 0 ? (moveTar.style.top = (rectVal.top - tar_height) + "px") : (moveTar.style.top = rectVal.top + "px");
            // 如果 bottom 仍小于零则更改 scrollTop
            parseFloat(getStyle(moveTar, "bottom")) < 0 && (ELE["lv2-container"].scrollTop += ((-parseFloat(getStyle(moveTar, "bottom"))) + 8));
            moveTar.style.left = (rectVal.left - tar_width + 20) + "px";
            var tmp_idx = this.parentNode.parentNode.getElementsByClassName("cbx")[0].getAttribute("for");
            ELE["singleCheckedItem"][0] = tmp_idx;
        };
        return oDiv;
    };
    var md_shelf = document.createElement("div");
    md_shelf.className = "md-shelf" + (array["today"] ? "\ today" : "");
    md_shelf.innerHTML = '<div class="shelf-title"><span class="md-text-setting">' + array["day"] + '</span></div>';
    for(var a=0; a<array["hry_list"].length; a++){
        md_shelf.appendChild(fn_mk_shelf_body(array["hry_list"][a]));
    }
    return md_shelf;
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