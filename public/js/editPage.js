window.onload = function(){
    volSetRipple(".backwards");
    volSetRipple(".outline-btn");
    console.log(CITIES)
    my_utils.Ajax({
        // "url": baseURL + "api/register",
        "url": "http://127.0.0.1:2121",
        "method": "POST",
        "dataType": "text",
        "data": {
        },
        "beforeSend": function(oXML){
            oXML.setRequestHeader("Accept", "application\/json");
        },
        "success": function(res){
            var data = JSON.parse(res);
            console.log(data)
            var lel = data["LEVELS"];
            var editTar = {
                "innerHTML": {
                    "sel0": data["TAG"],
                    "sel1": lel["lv0"],
                    "sel2": lel["lv1"],
                    "sel3": lel["lv2"],
                    "sel4": lel["lv3"],
                    "sel5": data["RECEIVER"],
                    "sel6": data["TEL"]
                },
                "dataset": {
                    "alert": {
                        "dat0": {"type":"select","a_title":"选择省份/ 直辖市"},
                        "dat1": {"type":"select","a_title":"选择市"},
                        "dat2": {"type":"select","a_title":"选择区/ 县"},
                        "dat3": {"type":"input","a_title":"输入详细地址"},
                        "dat4": {"type":"switcher","a_title":null,"bind-data-name":"isDefault","default_val":null},
                        "dat5": {"type":"input","a_title":"为当前地址定义标签","bind-data-name":"TAG","default_val":data["TAG"]},
                        "dat6": {"type":"input","a_title":"修改收件人","bind-data-name":"RECEIVER","default_val":data["RECEIVER"]},
                        "dat7": {"type":"input","a_title":"修改联系方式","bind-data-name":"TEL","default_val":data["TEL"]}
                    },
                    "sel": {
                        "dat0": {"lv":0,"val":lel["lv0"],"use-for-address":"0"},
                        "dat1": {"lv":1,"val":lel["lv1"],"use-for-address":"0"},
                        "dat2": {"lv":2,"val":lel["lv2"],"use-for-address":"0"},
                        "dat3": {"lv":3,"val":lel["lv3"],"use-for-address":"0"}
                    }
                }
            }
            for(var x in editTar["innerHTML"]) document.getElementById(x).innerHTML = editTar["innerHTML"][x];
            for(var y in editTar["dataset"]["sel"]) document.getElementById(y).dataset.sel = JSON.stringify(editTar["dataset"]["sel"][y]);
            for(var z in editTar["dataset"]["alert"]) document.getElementById(z).dataset.alert = JSON.stringify(editTar["dataset"]["alert"][z]);
            ELE["settings-form"]["isDefault"] = data["isDefault"];
            document.getElementById("MaterialToggle").checked = data["isDefault"];
            renderPage();
        },
        "error": function(){
    
        }
    });
}
var ELE = {
    "lv2-nav": document.getElementsByClassName("lv2-nav")[0],
    "lv2-container": document.getElementsByClassName("lv2-container")[0],
    "dia_bg": document.getElementsByClassName("dia_bg")[0],
    "dia-box": document.getElementsByClassName("dia-box")[0],
    "dia-title": document.getElementsByClassName("dia-title")[0],
    "dia-content": document.getElementsByClassName("dia-content")[0],
    "dia-footer": document.getElementsByClassName("dia-footer")[0],
    "address-settings": trans2Arr(document.querySelectorAll(".address-settings .setting-list")),
    "user-base-toggle": document.getElementById("user-base-toggle"),
    "for-save-address": document.getElementById("for-save-address"),
    "for-delete-address": document.getElementById("for-delete-address"),
    "switchers": trans2Arr(document.getElementsByClassName("md-switcher")) || [],
    "radios": trans2Arr(document.getElementsByClassName("md-radioBtn")) || [],
    "settings-form": {"LEVELS":{},"isDefault":false,"TAG":"","RECEIVER":"","TEL":""}
}
// 地址的数据
var currentTarget = {};
var addressList = {};
var levels = {};
var mapList = {};
mapList["lv0"] = (function(){
    var i = 0, a = []; for(a[i++] in CITIES); /* empty */ return a;
})();
function renderPage(){
    ELE["lv2-container"].onclick = function(){
        ELE["user-base-toggle"].checked = false;
    }
    ELE["switchers"].myForEach(function(item){
        item.addEventListener("click", function(){
            var tog = this.querySelector("[name='md-toggle']");
            tog.checked = !tog.checked;
        });
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
    };
    ELE["dia_bg"].onclick = function(e){
        my_utils.removeClass(this, "show_dia");
    };
    ELE["for-delete-address"].onclick = function(){
        ELE["dia-title"].innerText = "删除地址";
        removeInnerEle(ELE["dia-content"]);
        var text =  document.createElement("p");
        text.innerText = "确定删除“地址1”吗？此操作无法撤销。";
        ELE["dia-content"].appendChild(text);
        addDiaOptions([{
            "label": "取消",
            "fn": function(){
                ELE["dia_bg"].onclick();
            }
        }, {
            "label": "确定",
            "fn": function(){
                // delete address API
                ELE["dia_bg"].onclick();
            }
        }]);
        my_utils.addClass(ELE["dia_bg"], "show_dia");
    };
    ELE["for-save-address"].onclick = function(){
        ELE["dia-title"].innerText = "保存地址";
        removeInnerEle(ELE["dia-content"]);
        var text =  document.createElement("p");
        text.innerText = "收货地址已保存！";
        ELE["dia-content"].appendChild(text);
        addDiaOptions([{
            "label": "继续编辑",
            "fn": function(){
                ELE["dia_bg"].onclick();
            }
        }, {
            "label": "退出",
            "fn": function(){
                
            }
        }]);
        ELE["settings-form"]["LEVELS"] = levels;
        my_utils.addClass(ELE["dia_bg"], "show_dia");
    };
    ELE["address-settings"].myForEach(function(item, idx){
        var listInf = JSON.parse(item.dataset.alert);
        item.onclick = function(){
            if(listInf["type"] === "input"){
                ELE["dia-title"].innerText = listInf["a_title"];
                showAddInputDia({
                    "placeholder":"",
                    "focused": false,
                    "rows": 1,
                    "multiLine": false,
                    "defaultVal": ELE["settings-form"][listInf["bind-data-name"]] || listInf["default_val"]
                });
                addDiaOptions([{
                    "label": "取消",
                    "fn": function(){
                        ELE["dia_bg"].onclick();
                    }
                }, {
                    "label": "确定",
                    "fn": function(){
                        var val_ = document.getElementById("multi-line").value.replace(/\ /g, "");
                        var conditions = ["not_a_phone_number", "isEmpty"];
                        for(var x=0; x<conditions.length; x++){
                            my_utils.removeClass(document.getElementsByClassName("md-for-input")[0], conditions[x]);
                        }
                        var nextStep = function(){
                            if(val_){
                                for(var key in ELE["settings-form"]) listInf["bind-data-name"] === key && (
                                    ELE["settings-form"][key] = val_
                                );
                                ELE["dia_bg"].onclick();
                                document.getElementsByClassName("address-" + listInf["bind-data-name"])[0].innerHTML = val_
                            }
                            return "";
                        };
                        var Res = val_ === "" ? "isEmpty" : (
                            listInf["bind-data-name"] === "TEL" ? (
                                val_.match(regExps["phone"]) ? nextStep() : "not_a_phone_number"
                            ) : nextStep()
                        );
                        my_utils.addClass(document.getElementsByClassName("md-for-input")[0], Res)
                    }
                }]);
                document.getElementById("multi-line").focus();
                my_utils.addClass(ELE["dia_bg"], "show_dia");
            };
            if(listInf["type"] === "switcher"){
                ELE["settings-form"]["isDefault"] = !ELE["settings-form"]["isDefault"];
            };
        }
        item.removeAttribute("data-alert");
    });
    refreshData();
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

            var listFn = JSON.parse(list.dataset.alert);
            list.onclick = function(){
                var that = this;
                ELE["dia-title"].innerHTML = listFn["a_title"];
                if(listFn["type"] === "input"){
                    showAddInputDia({"placeholder": "详细地址，256字以内", "maxlength": 256, "focused": true, "defaultVal": listInf["val"], "multiLine": true});
                    addDiaOptions([
                        {
                            "label": "取消",
                            "fn": function(){
                                ELE["dia_bg"].onclick();
                            }
                        },
                        {
                            "label": "确定",
                            "fn": function(){
                                var value = document.getElementById("multi-line").value;
                                if(value){
                                    that.querySelector(".label").innerHTML = value || " ";
                                    ELE["dia_bg"].onclick();
                                    currentTarget = listInf;
                                    addressList[currentTarget["use-for-address"]]["dataset_from_DOM"][3]["val"] = value;
                                    levels["lv3"] = value;
                                };
                            }
                        }
                    ]);
                }
                if(listFn["type"] === "select"){
                    removeInnerEle(ELE["dia-content"]);
                    removeInnerEle(ELE["dia-footer"]);
                    ELE["dia-content"].appendChild(createLi(mapList["lv" + idx], idx));
                    currentTarget = listInf;
                }
                my_utils.addClass(ELE["dia_bg"], "show_dia");
            };
            list.removeAttribute("data-alert");
            levels["lv"+idx] = listInf["val"];
        });
    });
    updateMapList();
}
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
function showAddInputDia(json){
    var $json$ = {};
    $json$.placeholder = json.placeholder || "请输入";
    $json$.maxlength = json.maxlength || 200;
    $json$.rows = json.rows || 4;
    $json$.focused = json.focused || false;
    $json$.defaultVal = json.defaultVal || "";
    $json$.multiLine = true;
    $json$.multiLine = json.multiLine;
    var in_tag = $json$.multiLine?"textarea":"input type='text'";
    removeInnerEle(ELE["dia-content"]);
    var n_Div = document.createElement("div");
    n_Div.className = 'md-for-input'+ ($json$.focused?"\ focused":""); n_Div.id = "detail-add";
    n_Div.innerHTML = '<label for="multi-line" class="md-text-setting">' + $json$.placeholder + '</label>' +
        '<div class="multi-out md-text-setting"><'+in_tag+' class="md-textarea md-text-setting" id="multi-line" tabindex="0" rows="'+ $json$.rows + '" maxlength="'+ $json$.maxlength + '"></'+in_tag+'></div>';
    ELE["detail-add"] = n_Div; ELE["multi-line"] = n_Div.querySelector("#multi-line"); ELE["multi-line"].value = $json$.defaultVal;
    ELE["dia-content"].appendChild(n_Div);
    ELE["multi-line"].addEventListener("focus", function(){
        my_utils.addClass(ELE["detail-add"], "focused");
    });
    ELE["multi-line"].addEventListener("blur", function(){
        ELE["multi-line"].value.length || my_utils.removeClass(ELE["detail-add"], "focused");
    });
    var timer = setTimeout(function(){
        ELE["multi-line"].focus();
        ELE["multi-line"].select();
        clearTimeout(timer);
    }, 300);
}
function addDiaOptions(json){
    removeInnerEle(ELE["dia-footer"]);
    json.myForEach(function(item, idx){
        var n_Button = document.createElement("button");
        n_Button.innerHTML = '<span>' + item.label +'</span>';
        n_Button.onclick = function(e){
            item.fn(e, this);
        }
        ELE["dia-footer"].appendChild(n_Button)
    });
}