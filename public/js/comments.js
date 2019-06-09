var content = {
    "product-info": {},
    "comments": [
        {
            "avatars-config": {
                "fg_text": "一",
                "fg_color": "#1a73e8",
                "bg_color": "#4082fc",
                "bg_type": 2
            },
            "user-name": "文文问",
            "post-date": "2019-5-18",
            "s": 100,
            "said-what": "很好，，，，很不错，，好，，，，，很好，，，，很不错，，，，。。。"
        },
        {
            "avatars-config": {
                "fg_text": "二",
                "fg_color": "#84ac52",
                "bg_color": "#25ca48",
                "bg_type": 0
            },
            "user-name": "用户2",
            "post-date": "2019-5-10",
            "s": 70,
            "said-what": "just so so"
        },
        {
            "avatars-config": {
                "fg_text": "三",
                "fg_color": "#594863",
                "bg_color": "#ac5385",
                "bg_type": 1
            },
            "user-name": "用户3",
            "post-date": "2019-4-28",
            "s": 60,
            "said-what": "OKOKOOKOKOKOKOKKOK海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjOKOKOKOKOKOKOKOK"
        },
        {
            "avatars-config": {
                "fg_text": "四",
                "fg_color": "#894acc",
                "bg_color": "#cca498",
                "bg_type": 3
            },
            "user-name": "用户3",
            "post-date": "2019-4-9",
            "s": 40,
            "said-what": "OKOKOOKOKOKOKOKKOKOKOKOKOKO海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjKOKOKOK"
        },
        {
            "avatars-config": {
                "fg_text": "五",
                "fg_color": "#88aacc",
                "bg_color": "#ccaa88",
                "bg_type": 4
            },
            "user-name": "用户3",
            "post-date": "2019-4-2",
            "s": 20,
            "said-what": "海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskj"
        },
        {
            "avatars-config": {
                "fg_text": "六",
                "fg_color": "#894acc",
                "bg_color": "#cca498",
                "bg_type": 3
            },
            "user-name": "用户3",
            "post-date": "2019-3-21",
            "s": 80,
            "said-what": "OKOKOOKOKOKOKOKKOKOKOKOKOKO海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjKOKOKOK"
        },
        {
            "avatars-config": {
                "fg_text": "七",
                "fg_color": "#88aacc",
                "bg_color": "#ccaa88",
                "bg_type": 4
            },
            "user-name": "用户3",
            "post-date": "2019-3-18",
            "s": 90,
            "said-what": "海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskj"
        },
        {
            "avatars-config": {
                "fg_text": "八",
                "fg_color": "#894acc",
                "bg_color": "#cca498",
                "bg_type": 3
            },
            "user-name": "用户3",
            "post-date": "2019-3-15",
            "s": 100,
            "said-what": "OKOKOOKOKOKOKOKKOKOKOKOKOKO海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjKOKOKOK"
        },
        {
            "avatars-config": {
                "fg_text": "九",
                "fg_color": "#88aacc",
                "bg_color": "#ccaa88",
                "bg_type": 4
            },
            "user-name": "用户3",
            "post-date": "2019-3-10",
            "s": 10,
            "said-what": "海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskj"
        }
    ]
}
window.onload = function(){
    AjaxRequest.post({
        "url": "http://127.0.0.1:2121",
        "onSuccess": function(req){
            var res = JSON.parse(req.responseText);
            var commentsLen = res["comments"].length;
            document.querySelector(".commentsLen").innerHTML = commentsLen;
            for(var a=0; a<commentsLen; a++){
                var tmp_info =  res["comments"][a];
                var CP = mkCommentPart(
                    mkSVG_Avatars(tmp_info["avatars-config"]).innerHTML,
                    tmp_info
                );
                CP["SYMBOL"] = {};
                CP["SYMBOL"]["user-name"] = tmp_info["user-name"];
                CP["SYMBOL"]["post-date"] = tmp_info["post-date"];
                CP["SYMBOL"]["s"] = tmp_info["s"];
                ELE["comment-box"].appendChild(CP);
            };
            var commentPart = trans2Arr(ELE["comment-box"].getElementsByClassName("comment-part"));
            commentPart.myForEach(function(item){
                console.log(item.SYMBOL)
            });
            mkSeleGrp();
            ELE["sortByFns"]["newest"]();
        },
        "onError": function(){
            var res = content;
            var commentsLen = res["comments"].length;
            document.querySelector(".commentsLen").innerHTML = commentsLen;
            for(var a=0; a<commentsLen; a++){
                var tmp_info =  res["comments"][a];
                var CP = mkCommentPart(
                    mkSVG_Avatars(tmp_info["avatars-config"]).innerHTML,
                    tmp_info
                );
                CP["SYMBOL"] = {};
                CP["SYMBOL"]["user-name"] = tmp_info["user-name"];
                CP["SYMBOL"]["post-date"] = tmp_info["post-date"];
                CP["SYMBOL"]["s"] = tmp_info["s"];
                ELE["comment-box"].appendChild(CP);
            };
            var commentPart = trans2Arr(ELE["comment-box"].getElementsByClassName("comment-part"));
            commentPart.myForEach(function(item){
                console.log(item.SYMBOL)
            });
            mkSeleGrp();
            ELE["sortByFns"]["newest"]();
        }
    });
};
var ELE = {
    "lv2-nav": document.getElementsByClassName("lv2-nav")[0],
    "lv2-container": document.getElementsByClassName("lv2-container")[0],
    "comment-box": document.getElementsByClassName("comment-box")[0],
    "selection_bg": document.getElementsByClassName("selection_bg")[0],
    "user_profile": document.getElementsByClassName("user_profile")[0],
    "Seles": trans2Arr(document.getElementsByClassName("selector")),
    "sortByFns": {
        "by-date-order": function(reverse=false){
            var prevPos = 0;
            var starOrder = document.getElementById("star-order");
            var SsItem = trans2Arr(starOrder.parentNode.querySelectorAll(".selector-item"));
            for(var x=0; x<SsItem.length; x++){
                if(classListExist(SsItem[x], "active")){
                    prevPos = x;
                    break;
                }
            };
            my_utils.removeClass(SsItem[prevPos], "active");
            my_utils.addClass(starOrder, "active");
            starOrder.parentNode.parentNode.getElementsByClassName("selector-label")[0].innerHTML = "全部评级";
            // --- //
            var tmpCP = trans2Arr(ELE["comment-box"].getElementsByClassName("comment-part"));
            tmpCP.sort(function(item_a, item_b){
                var a_date = item_a.SYMBOL["post-date"].split("-");
                var b_date = item_b.SYMBOL["post-date"].split("-");
                var date_of_a = new Date(a_date[0], a_date[1]-1, a_date[2]).getTime();
                var date_of_b = new Date(b_date[0], b_date[1]-1, b_date[2]).getTime();
                return reverse ? date_of_b - date_of_a : date_of_a - date_of_b;
            });
            for(var i=0; i<tmpCP.length; i++){
                ELE["comment-box"].appendChild(tmpCP[i]);
                tmpCP[i].style.display = "flex";
            }
        },
        "newest": function(){
            this["by-date-order"](true);
        },
        "by-star-num-order": function(def=true){
            var tmpCP = trans2Arr(ELE["comment-box"].getElementsByClassName("comment-part"));
            tmpCP.sort(function(item_a, item_b){
                return item_b.SYMBOL["s"] - item_a.SYMBOL["s"];
            });
            for(var i=0; i<tmpCP.length; i++){
                ELE["comment-box"].appendChild(tmpCP[i]);
                def ? tmpCP[i].style.display = "flex" : "";
            }
        }
    }
};
(function(){
    var i = 5;
    while (i >= 0) {
        ELE["sortByFns"][i+"-s"] = starFilterFn(i*20);
        i--;
    }
})()
ELE["lv2-container"].onscroll = function(){
    this.scrollTop ? my_utils.removeClass(ELE["lv2-nav"], "topped") : my_utils.addClass(ELE["lv2-nav"], "topped");
};
ELE["selection_bg"].onclick = function(){
    ELE["Seles"].myForEach(function(item){
        my_utils.removeClass(item.querySelector(".selector-selections"), "active");
    });
    document.getElementById("user-base-toggle").checked = false;
    this.style.visibility = "hidden";
};
ELE["user_profile"].onclick = function(){
    ELE["Seles"].myForEach(function(item){
        my_utils.removeClass(item.querySelector(".selector-selections"), "active");
    });
    var user_tog = document.getElementById("user-base-toggle").checked;
    user_tog ? (ELE["selection_bg"].style.visibility = "hidden") : (ELE["selection_bg"].style.visibility = "visible");
};
function mkSeleGrp(){
    var Seles = ELE["Seles"];
    Seles.myForEach(function(item){
        item.onclick = function(){
            ELE["selection_bg"].style.visibility = "visible";
            var Ss = this.querySelector(".selector-selections");
            my_utils.addClass(Ss, "active");
            var SsItem = trans2Arr(Ss.querySelectorAll(".selector-item"));
            SsItem.myForEach(function(item_){
                item_.onclick = function(){
                    var prevPos = 0;
                    for(var x=0; x<SsItem.length; x++){
                        if(classListExist(SsItem[x], "active")){
                            prevPos = x;
                            break;
                        }
                    };
                    my_utils.removeClass(SsItem[prevPos], "active");
                    my_utils.addClass(item_, "active");
                    item.timer = setTimeout(function(){
                        ELE["selection_bg"].onclick();
                        item.getElementsByClassName("selector-label")[0].innerHTML = item_.innerText;
                        ELE["sortByFns"][item_.dataset.sortBy](); /* execute sort function */
                        console.log(item_.dataset.sortBy)
                        clearTimeout(item.timer);
                    }, 100);
                }
            });
        }
    });
};
function mkSVG_Avatars(configs){
    var oDiv = document.createElement("div");
    oDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50">' + 
    '<path id="ava_pattern" d="' + profile_data_base[configs.bg_type] + '" fill="' + configs.bg_color + '"></path>' +
    '<text id="ava_text" x="50%" y="50%" dy="11" style="text-anchor:middle;font-size: 30px; font-family: Roboto, RobotoDraft, Microsoft YaHei, Helvetica, Arial, sans-serif; fill: ' + configs.fg_color + '; font-weight: 400">' + configs.fg_text[0] + '</text></svg>';
    return oDiv;
};
mkSVG_Avatars({
    "fg_text": "文",
    "fg_color": "#1a73e8",
    "bg_color": "#4082fc",
    "bg_type": 2
});
function mkCommentPart(HTML_SVG, others){
    var oCP = document.createElement("div");
    var d_jn = others["post-date"].split("-");
    oCP.className = "comment-part";
    oCP.innerHTML = '<div class="comment-avatars">' + HTML_SVG + '</div>' +
    '<div class="comment-said">' + '<div class="margin-box">' + '<div class="user-name md-text-setting"><span>' + others["user-name"] + '</span></div>' + 
    '<div class="comment-date md-text-setting"><span></span>' + d_jn[0] + "年" + d_jn[1] + "月"  + d_jn[2] + "日" + '</span></div>' + '</div>' +
    '<div class="said-what md-text-setting">' + '<p>' +
    others["said-what"].split("\n").join("</p><p>") + '</p>' + '</div>' + '</div>' + '<div class="stars">' + 
    '<img src="./img/stars/star-' + others["s"] + '.svg" alt=""></img>';
    return oCP;
};
function starFilterFn(num){
    return function(){
        var tmpCP = ELE["comment-box"].getElementsByClassName("comment-part");
        for(var i=0; i<tmpCP.length; i++){
            tmpCP[i].style.display = (tmpCP[i].SYMBOL["s"] === num) || (tmpCP[i].SYMBOL["s"] === num - 10) ? "flex" : "none";
        }
        ELE["sortByFns"]["by-star-num-order"](false);
    }
}
