window.onload = function(){
    setMenuBtnColor("#000");
    prev_menuBtnColor = "#000";
    volSetRipple(".under-selection-list:not(:first-child)");
};
var ELE = {
    "sort-by-btn": document.getElementById("sort-by"),
    "display-as-btn": document.getElementById("display-as")
};
ELE["sort-by-btn"].onclick = function(e){
    stopBubble(e);
    hide_cart_list();
    my_utils.removeClass(ELE["display-as-btn"].getElementsByClassName("under-selection")[0], "shown");
    var tar = this.getElementsByClassName("under-selection")[0];
    my_utils.addClass(tar, "shown");
    document.addEventListener("click", function(e){
        my_utils.removeClass(tar, "shown");
    });
};
ELE["display-as-btn"].onclick = function(e){
    stopBubble(e);
    hide_cart_list();
    my_utils.removeClass(ELE["sort-by-btn"].getElementsByClassName("under-selection")[0], "shown");
    var tar = this.getElementsByClassName("under-selection")[0];
    my_utils.addClass(tar, "shown");
    document.addEventListener("click", function(e){
        my_utils.removeClass(tar, "shown");
    });
};
my_cart.addEventListener("click", function(e){
    stopBubble(e);
    my_utils.removeClass(ELE["sort-by-btn"].getElementsByClassName("under-selection")[0], "shown");
    my_utils.removeClass(ELE["display-as-btn"].getElementsByClassName("under-selection")[0], "shown");
});