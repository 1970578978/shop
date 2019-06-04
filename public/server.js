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
// var content = [
//     {
//         "day": "2019年5月3日",
//         "hry_list": [
//             {"time": "上午10:55", "type": "veg", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-3-0"},
//             {"time": "上午10:30", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-3-1"},
//             {"time": "上午10:29", "type": "veg", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-3-2"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-3-3"}
//         ],
//         "today": true
//     },
//     {
//         "day": "2019年5月2日",
//         "hry_list": [
//             {"time": "上午10:55", "type": "fru", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-2-0"},
//             {"time": "上午10:54", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-2-1"},
//             {"time": "上午10:53", "type": "fru", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-2-2"},
//             {"time": "上午10:52", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-2-3"}
//         ]
//     },
//     {
//         "day": "2019年5月1日",
//         "hry_list": [
//             {"time": "上午10:55", "type": "fru", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-1-0"},
//             {"time": "上午10:54", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-1-1"},
//             {"time": "上午10:53", "type": "fru", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-1-2"},
//             {"time": "上午10:52", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-1-3"}
//         ]
//     },
//     {
//         "day": "2019年4月30日",
//         "hry_list": [
//             {"time": "上午10:55", "type": "veg", "url": "http://...", "label": "第一条记录", "id": "d-2019-4-29-0"},
//             {"time": "上午10:30", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-4-29-1"},
//             {"time": "上午10:29", "type": "veg", "url": "http://...", "label": "第三条记录", "id": "d-2019-4-29-2"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-3"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-4"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-5"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-6"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-7"},
//             {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-4-29-8"}
//         ]
//     }
// ];
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
http.createServer(function(req, res){
    res.writeHead(200, {"content-type": "text/html;charset=utf-8", "Access-Control-Allow-Origin": "*"});
    if(req.url != "/favicon.ico"){
        res.write(JSON.stringify(content));
        res.end();
    }
}).listen("2121");