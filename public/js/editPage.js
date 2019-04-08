window.onload = function(){
    volSetRipple(".backwards");
    volSetRipple(".dia-footer button");
    console.log(CITIES)
}
var ELE = {
    "lv2-nav": document.getElementsByClassName("lv2-nav")[0],
    "lv2-container": document.getElementsByClassName("lv2-container")[0],
    "dia_bg": document.getElementsByClassName("dia_bg")[0],
    "dia-box": document.getElementsByClassName("dia-box")[0],
    "dia-content": document.getElementsByClassName("dia-content")[0],
    "user-base-toggle": document.getElementById("user-base-toggle"),
    "switchers": trans2Arr(document.getElementsByClassName("md-switcher")) || [],
    "radios": trans2Arr(document.getElementsByClassName("md-radioBtn")) || []
}
// 地址的数据
var currentTarget = {};
var addressList = {};
var levels = {};
var mapList = {};
mapList["lv0"] = (function(){
    var i = 0, a = []; for(a[i++] in CITIES); /* empty */ return a;
})();
ELE["lv2-container"].onclick = function(){
    ELE["user-base-toggle"].checked = false;
}
ELE["switchers"].myForEach(function(item){
    item.onclick = function(){
        var tog = this.querySelector("[name='md-toggle']");
        tog.checked = !tog.checked;
    }
});
ELE["radios"].myForEach(function(item){
    item.onclick = function(){
        this.querySelector("input[type='radio']").checked = true;
    }
});
ELE["lv2-container"].onscroll = function(){
    this.scrollTop ? my_utils.removeClass(ELE["lv2-nav"], "topped") : my_utils.addClass(ELE["lv2-nav"], "topped");
};
// ---- //
ELE["dia-box"].onclick = function(e){
    stopBubble(e);
}
ELE["dia_bg"].onclick = function(e){
    my_utils.removeClass(this, "show_dia");
}
// 地址功能相关方法
function createLi(arr, lel){
    var placeList = document.createElement("ul");
    placeList.className = "placeList";
    for(var x=0; x<arr.length; x++){
        var n_Li = document.createElement("li");
        n_Li.className = "setting-list no-sub md-radioBtn";
        n_Li.innerHTML = '<div class="hl trans-all-200"></div><div class="header-icon flex-center">' + 
            '<div class="md-radio"><input class="md-radio-nc" type="radio" id="radio-' + x + '" name="hero-radio-set" '+ ((arr[x] === levels["lv" + lel]) ? "checked" : "") +'><div class="md-radio-bg">' +
            '<div class="md-radio-oc"></div><div class="md-radio-ic"></div></div></div></div><div class="content-main md-text-setting"><div class="label">' + 
            arr[x] + '</div></div>';
        n_Li.onclick = function(){
            this.querySelector("input[type='radio']").checked = true;
            levels["lv"+lel] = this.querySelector(".label").innerHTML;
            updateMapList(lel);
            var y = 0;
            for(var key in levels){
                addressList[currentTarget["use-for-address"]]["DOM_Object"][y++].querySelector(".label").innerHTML = levels[key];
            }
            var tmpTimer = null;
            tmpTimer = setTimeout(function(){
                my_utils.removeClass(ELE["dia_bg"], "show_dia");
                clearTimeout(tmpTimer);
            }, 150);
        }
        placeList.appendChild(n_Li);
    }
    return placeList;
}
function refreshData(){
    // 根据初始的 dataset 进行数据初始化
    // 创建或修改 { var } addressList，刷新列表的 onclick 事件
    var arrAddressBox = trans2Arr(document.getElementsByClassName("address-box"));
    arrAddressBox.myForEach(function(item){
        var addressItems = trans2Arr(item.querySelectorAll(".setting-list"));
        addressItems.myForEach(function(list, idx){
            var listInf = JSON.parse(list.dataset.sel);
            var addIdx = listInf["use-for-address"];
            !addressList[addIdx] ? (addressList[addIdx] = {}) : null;
            !addressList[addIdx]["dataset_from_DOM"] ? (addressList[addIdx]["dataset_from_DOM"] = []) : null;
            !addressList[addIdx]["DOM_Object"] ? (addressList[addIdx]["DOM_Object"] = []) : null;
            addressList[addIdx]["dataset_from_DOM"][idx] = listInf;
            addressList[addIdx]["DOM_Object"][idx] = list;

            list.dataset.sel && list.removeAttribute("data-sel");

            list.onclick = function(){
                ELE["dia-content"].innerHTML = "";
                ELE["dia-content"].appendChild(createLi(mapList["lv" + idx], idx));
                currentTarget = listInf;
                my_utils.addClass(ELE["dia_bg"], "show_dia");
            };
            levels["lv"+idx] = listInf["val"];
        });
    });
    updateMapList();
}
refreshData();
function updateMapList(by){
    // 纠正和更新 levels
    if(by === 0){
        var i = 0; a = []; for(a[i++] in CITIES[levels["lv0"]]); /* empty */
        levels["lv1"] = a[0];
        levels["lv2"] = CITIES[levels["lv0"]][levels["lv1"]][0]
    }
    if(by === 1){
        levels["lv2"] = CITIES[levels["lv0"]][levels["lv1"]][0]
    }

    // 根据 { var } levels 更新 { var } mapList
    var j = 0, b = []; for(b[j++] in CITIES[levels["lv0"]]); /* empty */
    mapList["lv1"] = b;
    mapList["lv2"] = CITIES[levels["lv0"]][levels["lv1"]];
}