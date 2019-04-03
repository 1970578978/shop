window.onload = function(e){
    setMenuBtnColor("#000");
    prev_menuBtnColor = "#000";
    fitMenu();
    console.log(ELE["boolMenuList"])
};
window.addEventListener("resize", function(){
    fitMenu();
});
var ELE = {
    "aside-list": trans2Arr(document.getElementsByClassName("aside-list")),
    "content-container": trans2Arr(document.getElementsByClassName("content-container")),
    "aside-menu": document.getElementsByClassName("aside-menu")[0],
    "for-user-tip": document.getElementsByClassName("for-user-tip")[0],
    "boolMenuList": [],
    "test": document.getElementById("qwe")
};
ELE["aside-list"].myForEach(function(item, idx){
    ELE["boolMenuList"][idx] = false;
    ELE["boolMenuList"][0] = true;

    item.onclick = function(){
        for(var i=0; i<ELE["aside-list"].length; ELE["boolMenuList"][i++] = false) /* empty */;
        ELE["boolMenuList"][ELE["aside-list"].indexOf(item)] = true;
        ELE["boolMenuList"].myForEach(function(b, i){
            b ? my_utils.addClass(ELE["aside-list"][i], "active") : my_utils.removeClass(ELE["aside-list"][i], "active");
            b ? my_utils.addClass(ELE["content-container"][i], "active") : my_utils.removeClass(ELE["content-container"][i], "active");
        });
    }
});
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