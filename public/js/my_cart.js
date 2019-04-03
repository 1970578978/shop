var textJSON = [ // idx必须 0 - ...
    {
        "idx": "0",
        "ID": "AAA",
        "IMG": "./_test/muti.jpg",
        "M-INF-t": "b啊啊啊啊啊啊啊",
        "M-INF-s": "商品规格。。商品规格，商品规格",
        "PR": "27.90",
        "PCS": "1",
        "SIG": "27.90"
    },
    {
        "idx": "1",
        "ID": "BBB",
        "IMG": "./_test/muti.jpg",
        "M-INF-t": "a吧吧吧吧吧吧吧吧吧吧吧吧吧",
        "M-INF-s": "商品规格。。商品规格，商品规格",
        "PR": "25.00",
        "PCS": "2",
        "SIG": "26.50"
    },
    {
        "idx": "2",
        "ID": "CCC",
        "IMG": "./_test/muti.jpg",
        "M-INF-t": "从从从从从从从从从从从从从从从",
        "M-INF-s": "商品规格。。商品规格，商品规格",
        "PR": "55.00",
        "PCS": "5",
        "SIG": "25.00"
    },
    {
        "idx": "3",
        "ID": "DDD",
        "IMG": "./_test/muti.jpg",
        "M-INF-t": "e的的的的的的的的的的的的的的的的的",
        "M-INF-s": "商品规格。。商品规格，商品规格",
        "PR": "55.00",
        "PCS": "5",
        "SIG": "24.00"
    },
    {
        "idx": "4",
        "ID": "EEE",
        "IMG": "./_test/muti.jpg",
        "M-INF-t": "c的的的的的的的的的的的的的的的的的",
        "M-INF-s": "商品规格。。商品规格，商品规格",
        "PR": "55.00",
        "PCS": "5",
        "SIG": "100.00"
    }
];
window.onload = function(){
    setMenuBtnColor("#000");
    prev_menuBtnColor = "#000";
    volSetRipple(".under-selection-list:not(:first-child)");
    volSetRipple(".selAll");
    textJSON.myForEach(function(item){
        ELE["my_cart_container"].appendChild(createCartList(item));
    });
    ELE["checkBoxes"] = trans2Arr(document.getElementsByName("cart-list"));
    ELE["checkBoxes"].myForEach(function(item){
        item.onclick = function(){
            ELE["checkBoxes"].myForEach(function(ee){ // input.check
                // console.log(ee)
                // console.log(ee.checked)
            });
            let totalPR = 0; // 总价
            getSelects()["seledItems"].myForEach(function(seledItems){
                totalPR += parseFloat(seledItems.dataset.PR);
            });
            ELE["checkedArr"]["seledItems"].length === ELE["checkBoxes"].length && (ELE["selAll"].checked = true);
            ELE["checkedArr"]["n_seledItems"].length === ELE["checkBoxes"].length && (ELE["selAll"].checked = false);
            ELE["cost-look"].innerText = "已选" + ELE["checkedArr"]["seledItems"].length + "项，" + totalPR + "元";
            ELE["checkedArr"]["seledItems"].length !== 0 ? 
                (ELE["cost-look"].style.transform = "translateY(0) scale(1)") : (ELE["cost-look"].style.transform = "translateY(100%) scale(.1)")
                ELE["btn-purchase"].onclick = null;
            getSelects()["Boolean"].indexOf(true) !== -1 ? 
                my_utils.addClass(ELE["btn-purchase"], "purchase-ava") || (ELE["del-sels"].style.transform = "scale(1)") || (ELE["btn-purchase"].onclick = function(){solveAll()}) :
                my_utils.removeClass(ELE["btn-purchase"], "purchase-ava") || (ELE["del-sels"].style.transform = "scale(0)");
            getSelects()["Boolean"].indexOf(true) !== -1 ? (ELE["del-sels"].dataset.visibility = true) :(ELE["del-sels"].dataset.visibility = false);
            redoLogic();
        }
    });
    ELE["selAll_toggle"].onclick = function(){
        let bool = !ELE["selAll"].checked;
        ELE["messOption"] !== null && (bool = ELE["messOption"]);
        ELE["checkBoxes"].myForEach(function(e){
            e.checked = bool;
        });
        let totalPR = 0;
        getSelects()["seledItems"].myForEach(function(e){
            var tmpPR = e.dataset.PR;
            totalPR += parseFloat(tmpPR);
        });
        ELE["cost-look"].innerText = "已选" + ELE["checkedArr"]["seledItems"].length + "项，" + totalPR + "元";
        ELE["checkedArr"]["seledItems"].length !== 0 ? 
            (ELE["cost-look"].style.transform = "translateY(0) scale(1)") : (ELE["cost-look"].style.transform = "translateY(100%) scale(.1)");
        ELE["btn-purchase"].onclick = null;
        getSelects()["Boolean"].indexOf(true) !== -1 ? 
            my_utils.addClass(ELE["btn-purchase"], "purchase-ava") || (ELE["del-sels"].style.transform = "scale(1)") || (ELE["btn-purchase"].onclick = function(){solveAll()}) :
            my_utils.removeClass(ELE["btn-purchase"], "purchase-ava") || (ELE["del-sels"].style.transform = "scale(0)");
        getSelects()["Boolean"].indexOf(true) !== -1 ? (ELE["del-sels"].dataset.visibility = true) :(ELE["del-sels"].dataset.visibility = false);
        redoLogic();
    };
    ELE["sort_by"]["name"].onclick();
};
var ELE = {
    "sort-by-btn": document.getElementById("sort-by"),
    // "display-as-btn": document.getElementById("display-as"),
    "selAll": document.getElementById("selAll"),
    "selAll_toggle": document.getElementById("selAll_toggle"),
    "cost-look": document.getElementsByClassName("cost-look")[0],
    "my_cart_container": document.getElementsByClassName("my_cart_container")[0],
    "btn-purchase": document.getElementsByClassName("bt-bar-right")[0],
    "selectionTitle": document.getElementsByClassName("selection")[0],
    "del-sels": document.getElementsByClassName("del-sels")[0],
    "del-redo": document.getElementsByClassName("del-redo")[0],
    "messOption": null,
    "checkBoxes": null,
    "checkedArr": [],
    "sort_by": {
        "name": document.getElementById("by_name"),
        "price": document.getElementById("by_price"),
        "default": document.getElementById("by_default")
    },
    "nowSortBy": null
};
ELE["sort_by"]["name"].onclick = function(){
    getSelects();
    var oItems = ELE["checkedArr"]["n_seledItems"].concat(ELE["checkedArr"]["seledItems"]);
    var sort_set = JSON.parse(this.dataset.sortby);
    ELE["nowSortBy"] = sort_set;
    // false -> 降序
    oItems.sort(function(o1, o2){
        var val;
        sort_set.order ? 
            (val = o1.dataset.tit.localeCompare(o2.dataset.tit)) : 
            (val = o2.dataset.tit.localeCompare(o1.dataset.tit))
        return val;
    });
    oItems.myForEach(function(ele){
        ELE["my_cart_container"].appendChild(ele);
    });
    my_utils.removeClass(ELE["sort-by-btn"].getElementsByClassName("under-selection")[0], "shown");
    document.onclick();
    ELE["selectionTitle"].innerText = sort_set.tit + (sort_set.order?"（升序）": "（降序）");
    sort_set.order = !sort_set.order;
    this.dataset.sortby = JSON.stringify(sort_set);
};
ELE["sort_by"]["price"].onclick = function(){
    getSelects();
    var oItems = ELE["checkedArr"]["n_seledItems"].concat(ELE["checkedArr"]["seledItems"]);
    var sort_set = JSON.parse(this.dataset.sortby);
    ELE["nowSortBy"] = sort_set;
    // false -> 降序
    oItems.sort(function(o1, o2){
        var val;
        sort_set.order ? 
            (val = parseFloat(o1.dataset.SIG) - parseFloat(o2.dataset.SIG)) : 
            (val = parseFloat(o2.dataset.SIG) - parseFloat(o1.dataset.SIG))
        return val;
    });
    oItems.myForEach(function(ele){
        ELE["my_cart_container"].appendChild(ele);
    });
    my_utils.removeClass(ELE["sort-by-btn"].getElementsByClassName("under-selection")[0], "shown");
    document.onclick();
    ELE["selectionTitle"].innerText = sort_set.tit + (sort_set.order?"（升序）": "（降序）");
    sort_set.order = !sort_set.order;
    this.dataset.sortby = JSON.stringify(sort_set);
};
ELE["sort_by"]["default"].onclick = function(){
    getSelects();
    var oItems = ELE["checkedArr"]["n_seledItems"].concat(ELE["checkedArr"]["seledItems"]);
    var sort_set = JSON.parse(this.dataset.sortby);
    ELE["nowSortBy"] = sort_set;
    // false -> 降序
    oItems.sort(function(o1, o2){
        var val;
        sort_set.order ? 
            (val = parseFloat(o1.dataset.idx) - parseFloat(o2.dataset.idx)) : 
            (val = parseFloat(o2.dataset.idx) - parseFloat(o1.dataset.idx))
        return val;
    });
    oItems.myForEach(function(ele){
        ELE["my_cart_container"].appendChild(ele);
    });
    my_utils.removeClass(ELE["sort-by-btn"].getElementsByClassName("under-selection")[0], "shown");
    document.onclick();
    ELE["selectionTitle"].innerText = sort_set.tit + (sort_set.order?"（升序）": "（降序）");
    sort_set.order = !sort_set.order;
    this.dataset.sortby = JSON.stringify(sort_set);
}
ELE["sort-by-btn"].onclick = function(e){
    stopBubble(e);
    hide_cart_list();
    var tar = this.getElementsByClassName("under-selection")[0];
    my_utils.addClass(tar, "shown");
    document.addEventListener("click", function(e){
        my_utils.removeClass(tar, "shown");
    });
};
ELE["del-sels"].onclick = function(){
    var exeDels = getSelects();
    exeDels["seledItems"].myForEach(function(item){
        item.parentNode.removeChild(item);
    });
    ELE["checkBoxes"] = trans2Arr(document.getElementsByName("cart-list"));
    /*+++*/
    ELE["messOption"] = false;
    ELE["selAll_toggle"].onclick();
    ELE["messOption"] = null;
    /*+++*/
    ELE["del-redo"].style.transform = "scale(1) translateX(0)";
};
ELE["del-redo"].onclick = function(){
    ELE["my_cart_container"].innerHTML = "";
    textJSON.myForEach(function(item){
        ELE["my_cart_container"].appendChild(createCartList(item));
    });
    ELE["checkBoxes"] = trans2Arr(document.getElementsByName("cart-list"));
    ELE["checkBoxes"].myForEach(function(item){
        item.onclick = function(){
            ELE["checkBoxes"].myForEach(function(ee){ // input.check
                // console.log(ee)
                // console.log(ee.checked)
            });
            let totalPR = 0; // 总价
            getSelects()["seledItems"].myForEach(function(seledItems){
                totalPR += parseFloat(seledItems.dataset.PR);
            });
            ELE["checkedArr"]["seledItems"].length === ELE["checkBoxes"].length && (ELE["selAll"].checked = true);
            ELE["checkedArr"]["n_seledItems"].length === ELE["checkBoxes"].length && (ELE["selAll"].checked = false);
            ELE["cost-look"].innerText = "已选" + ELE["checkedArr"]["seledItems"].length + "项，" + totalPR + "元";
            ELE["checkedArr"]["seledItems"].length !== 0 ? 
                (ELE["cost-look"].style.transform = "translateY(0) scale(1)") : (ELE["cost-look"].style.transform = "translateY(100%) scale(.1)")
                ELE["btn-purchase"].onclick = null;
            getSelects()["Boolean"].indexOf(true) !== -1 ? 
                my_utils.addClass(ELE["btn-purchase"], "purchase-ava") || (ELE["del-sels"].style.transform = "scale(1)") || (ELE["btn-purchase"].onclick = function(){solveAll()}) :
                my_utils.removeClass(ELE["btn-purchase"], "purchase-ava") || (ELE["del-sels"].style.transform = "scale(0)");
            getSelects()["Boolean"].indexOf(true) !== -1 ? (ELE["del-sels"].dataset.visibility = true) :(ELE["del-sels"].dataset.visibility = false);
            redoLogic();
        }
    });
    /*+++*/
    ELE["messOption"] = false;
    ELE["selAll_toggle"].onclick();
    ELE["messOption"] = null;
    /*+++*/
    ELE["checkBoxes"] = trans2Arr(document.getElementsByName("cart-list"));
    this.style.transform = "scale(1) translateX(-150px)";
    // --- //
    ELE["sort_by"][ELE["nowSortBy"]["kind"].split("_")[1]].onclick();
    ELE["sort_by"][ELE["nowSortBy"]["kind"].split("_")[1]].onclick();
};
my_cart.addEventListener("click", function(e){
    stopBubble(e);
    my_utils.removeClass(ELE["sort-by-btn"].getElementsByClassName("under-selection")[0], "shown");
});
function redoLogic(){
    var visible = ELE["del-sels"].dataset.visibility;
    eval(visible) ? (ELE["del-redo"].style.transform = "scale(1) translateX(-150px)") : (ELE["del-redo"].style.transform = "scale(1) translateX(0)");
}
function createCartList(json){
    var mainList = document.createElement("div");
    my_utils.addClass(mainList, "my_cart-main-list");
    mainList.dataset.idx = json["idx"];
    mainList.dataset.PR = json["PR"];
    mainList.dataset.SIG = json["SIG"];
    mainList.dataset.tit = json["M-INF-t"];
    var cartHTML = 
    '<div class="check-box flex-center"><input class="hidden-xs-up" id="' + 
        (json["ID"] || '') + '" type="checkbox" name="cart-list"><label class="cbx" for="' + 
        (json["ID"] || '') + '"></label></div><div class="my_cart-main-list-l"><div class="l-pic" style="background-image: url(' + 
        (json["IMG"] || '') + ')"></div></div><div class="my_cart-main-list-r"><div class="r-top"><div class="r-top-left"><p class="md-text-setting">' + 
        (json["M-INF-t"] || '') + '</p><p class="md-text-setting m-inf">' + 
        (json["M-INF-s"] || '') + '</p><p class="md-text-setting mobi-price xs-d-block md-d-none">' + 
        (json["PR"] || '') + '</p><p class="md-text-setting mobi-price xs-d-block md-d-none m-inf m-sinf">共计' + 
        (json["PCS"] || '') + '件，每件' + 
        (json["SIG"] || '') + '元</p></div><div class="r-top-right xs-d-none md-d-block"><p class="md-text-setting cost-price">' + 
        (json["SIG"] || '') + '</p><p class="md-text-setting pieces">' + 
        (json["PCS"] || '') + 
            '</p></div></div><div class="r-bottom"><div class="btn-other"><div class="outline-btn flex-center"><span>加入收藏</span></div>' + 
            '<div class="outline-btn flex-center xs-d-none md-d-flex"><span>详情</span></div></div><div class="btn-pur"><div class="solid-btn flex-center purchase"><span>购买</span></div></div>' + 
            '<div class="md-text-setting flex-center total-cost xs-d-none md-d-flex"><span>' + 
        (json["PR"] || '') + '</span></div></div></div>';
    mainList.innerHTML = cartHTML;
    return mainList;
}
function getSelects(){
    let emp = [];
    let rep = {
        "seledItems": [],
        "n_seledItems": []
    };
    ELE["checkBoxes"].myForEach(function(e){
        emp.push(e.checked);
        e.checked ? rep["seledItems"].push(e.parentNode.parentNode) : rep["n_seledItems"].push(e.parentNode.parentNode);
    });
    rep.Boolean = emp;
    ELE["checkedArr"] = rep;
    return rep;
}
function solveAll(){ // 结算
    console.log("进行结算");
}