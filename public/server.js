const http = require("http");
const fs = require("fs");
const path = require("path");
// var content = {"LEVELS":{"lv0":"吉林","lv1":"松原","lv2":"扶余县","lv3":"建设路0123号小区123栋88888888888888"},"isDefault":false,"TAG":"家","RECEIVER":"王五","TEL":"18577569963"};
// var content = fs.readFileSync(path.join(__dirname, "content.json"), "utf-8");
var content = {
    "fg_text": "文",
    "fg_color": "#1a73e8",
    "bg_color": "#4082fc",
    "bg_type": 2
};
http.createServer(function(req, res){
    res.writeHead(200, {"content-type": "text/html;charset=utf-8", "Access-Control-Allow-Origin": "*"});
    if(req.url != "/favicon.ico"){
        res.write(JSON.stringify(content));
        res.end();
    }
}).listen("2121");