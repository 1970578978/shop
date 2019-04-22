window.onload = function(){
    setMDInput();
    my_utils.Ajax({
        "url": "http://127.0.0.1:2121",
        "method": "POST",
        "dataType": "text",
        "data": {
        },
        "beforeSend": function(oXML){
            oXML.setRequestHeader("Accept", "application\/json");
        },
        "success": function(res){
            setPattern();
            var data = JSON.parse(res);
            ELE["avatars_form"] = data;
            setAvatars(data);
            document.getElementById("recover_avatars").onclick = function(){
                setAvatars(JSON.parse(res));
                console.log(document.querySelectorAll(".pattern-group .pattern img")[JSON.parse(res)["bg_type"]].onclick())
            };
            console.log(data);
        }
    });
}
var ELE = {
    "ava_pattern": document.getElementById("ava_pattern"),
    "ava_text": document.getElementById("ava_text"),
    "dia_bg": document.querySelector(".dia_bg"),
    "preview_it": document.getElementById("preview_it"),
    "save_it": document.getElementById("save_it"),
    "color_picker": trans2Arr(document.querySelectorAll(".color_picker")),
    "tmp_color_input": document.getElementById("fg_color"),
    "avatars_form": null
}
ELE["dia_bg"].onclick = function(e){
    stopBubble(e);
    my_utils.removeClass(this, "show_dia");
};
ELE["preview_it"].addEventListener("click", function(){
    var clearClass = function(obj){
        var classes = ["focus", "filled", "danger"];
        for(var x=0; x<classes.length; x++) my_utils.removeClass(obj, classes[x]);
    }
    var input_group = trans2Arr(document.querySelectorAll(".md-outline-input input"));
    for(var x=0; x<input_group.length; x++){
        ELE["avatars_form"][input_group[x].getAttribute("id")] = input_group[x].value;
    }
    var f_color = ELE["avatars_form"]["fg_color"];
    var b_color = ELE["avatars_form"]["bg_color"];
    f_color.match(regExps["HEX_color"]) || (clearClass(document.getElementById("fg_color").parentNode) || my_utils.addClass(document.getElementById("fg_color").parentNode, "danger"));
    b_color.match(regExps["HEX_color"]) || (clearClass(document.getElementById("bg_color").parentNode) || my_utils.addClass(document.getElementById("bg_color").parentNode, "danger"));
    console.log(f_color.match(regExps["HEX_color"]), b_color.match(regExps["HEX_color"]));
    (f_color.match(regExps["HEX_color"]) && b_color.match(regExps["HEX_color"])) && setAvatars(ELE["avatars_form"]);
    console.log(ELE["avatars_form"])
});
ELE["save_it"].onclick = function(){
    setDialog({
        "title": "设置成功",
        "content": '<p>头像修改成功！</p>',
        "footer": [
            {
                "label": "继续编辑",
                "fn": function(){
                    console.log("a")
                    ELE["dia_bg"].onclick();
                }
            },
            {
                "label": "退出",
                "fn": function(){

                }
            }
        ]
    });
    my_utils.addClass(ELE["dia_bg"], "show_dia");
};
ELE["dia_bg"].querySelector(".dia-box").onclick = function(e){
    stopBubble(e);
};
ELE["color_picker"].myForEach(function(item){
    item.onclick = function(){
        var val = this.getAttribute("title");
        ELE["tmp_color_input"].value = val;
        ELE["tmp_color_input"].focus();
        ELE["tmp_color_input"].select();
        var str = ELE["tmp_color_input"].getAttribute("id");
        str === "fg_color" && (ELE["ava_text"].style.fill = val);
        str === "bg_color" && ELE["ava_pattern"].setAttribute("fill", val);
        console.log();
    }
});
function setMDInput(){
    var arrInput = trans2Arr(document.getElementsByClassName("md-outline-input"));
    var clearClass = function(obj){
        var classes = ["focus", "filled", "danger"];
        for(var x=0; x<classes.length; x++) my_utils.removeClass(obj, classes[x]);
    }
    arrInput.myForEach(function(item){
        var oInput = item.querySelector("input");
        var oPh = item.querySelector(".place-holder");
        var oWo = item.querySelector(".oWo");
        oWo.style.width = (parseFloat(getStyle(oPh, "width"))*.75 + 9) + "px";
        console.log(getStyle(oPh, "width"));
        oInput.onfocus = function(){
            if(this.getAttribute("id").match(/color/)) ELE["tmp_color_input"] = this;
            clearClass(item);
            my_utils.addClass(item, "focus");
            this.select();
        }
        oInput.onblur = function(){
            clearClass(item);
            this.value ? my_utils.addClass(item, "filled") : "";
        }
    });
};
function setPattern(){
    var Patterns = trans2Arr(document.querySelectorAll(".pattern"));
    var map_b = [];
    for(var a=0; a<Patterns.length; a++){
        map_b[a] = classListExist(Patterns[a], "active");
    }
    Patterns.myForEach(function(item, idx){
        item.querySelector("img").onclick = function(){
            for(var b=0; b<map_b.length; b++){
                map_b[b] && my_utils.removeClass(Patterns[b], "active")
                map_b[b] || (map_b[b] = false);
            }
            map_b[idx] = true;
            my_utils.addClass(Patterns[idx], "active");
            ELE["ava_pattern"].setAttribute("d", profile_data_base[idx]);
            ELE["avatars_form"]["bg_type"] = idx;
        }
    });
    console.log(map_b);
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
function setAvatars(json){
    for(var m in json){
        var tar = document.getElementById(m);
        if(!tar) continue;
        tar.value = json[m];
    }
    var Patterns = document.querySelectorAll(".pattern-group img");
    Patterns[json["bg_type"]].onclick();
    var pattern = document.querySelector("#ava_pattern");
    var text = document.querySelector("#ava_text");
    pattern.setAttribute("fill", json.bg_color || "#ffc8c2");
    pattern.setAttribute("d", profile_data_base[json.bg_color] || profile_data_base[3]);
    text.innerHTML = json.fg_text.substr(0, 1);
    text.style.fill = json.fg_color || "#ff6789"
}