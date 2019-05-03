const http = require("http");
const fs = require("fs");
const path = require("path");
// var content = {"LEVELS":{"lv0":"吉林","lv1":"松原","lv2":"扶余县","lv3":"建设路0123号小区123栋88888888888888"},"isDefault":false,"TAG":"家","RECEIVER":"王五","TEL":"18577569963"};
// var content = fs.readFileSync(path.join(__dirname, "content.json"), "utf-8");
// var content = {
//     "fg_text": "文",
//     "fg_color": "#1a73e8",
//     "bg_color": "#4082fc",
//     "bg_type": 2
// };
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
    },
    {
        "day": "2019年4月30日",
        "hry_list": [
            {"time": "上午10:55", "type": "veg", "url": "http://...", "label": "第一条记录", "id": "d-2019-4-29-0"},
            {"time": "上午10:30", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-4-29-1"},
            {"time": "上午10:29", "type": "veg", "url": "http://...", "label": "第三条记录", "id": "d-2019-4-29-2"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-3"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-4"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-5"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-6"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-7"},
            {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-8"}
        ]
    }
];
http.createServer(function(req, res){
    res.writeHead(200, {"content-type": "text/html;charset=utf-8", "Access-Control-Allow-Origin": "*"});
    if(req.url != "/favicon.ico"){
        res.write(JSON.stringify(content));
        res.end();
    }
}).listen("2121");