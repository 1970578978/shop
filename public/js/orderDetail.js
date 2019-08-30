window.onload = function(){
    copyText();
}
function copyText(){
    var btns = trans2Arr(document.getElementsByClassName("copy-btn"));
    btns.myForEach(function(i){
        console.log(i.dataset.copyTar)
        var copytar = document.getElementById(i.dataset.copyTar);
        i.onclick = function(){
            SelectText(copytar);
            document.execCommand("Copy");
        }
    });
}
function SelectText(text){
    var bType = BrowserType();
    if(bType.isSafari){ // safari
        var selection = window.getSelection();
        selection.setBaseAndExtent(text, 0, text, 1);
    }else if(bType.isFF || bType.isOpera || bType.isChrome){
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }else{ // IE & others
        var range = document.body.createTextRange();  
        range.moveToElementText(text);  
        range.select();  
    }
}
function BrowserType(){  
    var userAgent = navigator.userAgent; //取得浏览器的 userAgent 字符串
    var typeis = {};
    typeis.isOpera = userAgent.indexOf("Opera") > -1; //判断是否 Opera 浏览器  
    typeis.isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否 IE 浏览器  
    typeis.isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否 IE 的 Edge 浏览器  
    typeis.isFF = userAgent.indexOf("Firefox") > -1; //判断是否 Firefox 浏览器  
    typeis.isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否 Safari 浏览器 
    typeis.isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断 Chrome 浏览器
    return typeis;
}