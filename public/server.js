const http = require("http");
const fs = require("fs");
const path = require("path");
var content = {"LEVELS":{"lv0":"吉林","lv1":"松原","lv2":"扶余县","lv3":"建设路0123号小区123栋88888888888888"},"isDefault":false,"TAG":"家","RECEIVER":"王五","TEL":"18577569963"};
/**
 * @name 收货信息数据的格式 ①
 * @param { JSON }      content.LEVELS          省市区以及详细地址（吉林省 松原市扶余县...）
 * @param { Boolean }   content.isDefault       用户是否设置此地址为默认收货地址
 * @param { String }    content.TAG             用户为此地址所设置的标签（家、学校、公司）
 * @param { String }    content.RECEIVER        用户昵称
 * @param { String }    content.TEL             收货人电话
 * @description 
 * @example 
 *  {
 *       "LEVELS": {
 *           "lv0": "吉林",
 *           "lv1": "松原",
 *           "lv2": "扶余县",
 *           "lv3": "建设路0123号小区123栋88888888888888"
 *       },
 *       "isDefault": false,
 *       "TAG": "家",
 *       "RECEIVER": "王五",
 *       "TEL": "18577569963" *
 *   }
 */
/**
 * @name 用户头像（avatars）外观数据的格式 ②
 * @param { String }    content.fg_text     前景文字，只支持单个字
 * @param { String }    content.fg_color    前景文字的颜色，十六进制
 * @param { String }    content.bg_color    背景图案的颜色，十六进制
 * @param { Number }    content.bg_type     背景图案的类别，具体有哪几种参见 ../js/profile_data_base.js 九种，数字
 * @description
 * @example
 *  {
 *      "fg_text": "文",
 *      "fg_color": "#1a73e8",
 *      "bg_color": "#4082fc",
 *      "bg_type": 2
 *  }
 */
/**
 * @name 历史记录页面所接受的数据的格式 ③
 * @param { Array } content 接收的这个数据格式为数组类型
    * @param { String } content[x].day 标注某一天的日期，格式："2019年6月10日"
    * @param { Array } content[x].hry_list （history list）历史浏览记录的列表，为JSON组成的数组
        * @param { String } content[x].hry_list.time 产生这条记录的时间，格式"上午10:55"
        * @param { String } content[x].hry_list.type 浏览这条商品的食物所属类型（veg：蔬菜，fru：水果，snack：其他零食），分为这几类的原因是方便用户浏览
        * @param { String } content[x].hry_list.url 这条记录的链接地址，跳转地址，（商品详情页）
        * @param { String } content[x].hry_list.label 商品的名称
        * @param { String } content[x].hry_list.id 一个标识符，主要是方便前台界面的渲染，格式"d-2019-5-3-{index}"
    * @param { Boolean } content[x].today 当前日期是否为今天
 * @example
 *  [
 *      {
 *          "day": "2019年5月3日",
 *          "hry_list": [
 *              {"time": "上午10:55", "type": "veg", "url": "http://...", "label": "第一条记录", "id": "d-2019-5-3-0"},
 *              {"time": "上午10:30", "type": "fru", "url": "http://...", "label": "第二条记录", "id": "d-2019-5-3-1"},
 *              {"time": "上午10:29", "type": "veg", "url": "http://...", "label": "第三条记录", "id": "d-2019-5-3-2"},
 *              {"time": "上午10:29", "type": "snack", "url": "http://...", "label": "第四条记录", "id": "d-2019-5-3-3"}
 *          ],
 *          "today": true
 *      },
 *      ...
 *      ...
 *  ]
 */
/**
 * @name 商品评论页全部评论 ④
 * @param { JSON } content ['product-info'] 商品的相关信息
 * @param { JSON } content ['comments'] 商品评论
    * @param { JSON } content ['avatars-config'] 某条评论的评论者的用户头像外观数据 @name 注释 ②
    * @param { String } content ['user-name'] 某条评论的评论者的用户昵称
    * @param { String } content ['post-date'] 某条评论的发表日期 @format ['2019-5-18']
    * @param { Number } content ['s'] 某个用户的某条评论所给的商品评级 @member ∈ [10,20,30,40,50,60,70,80,90,100]
    * @param { String } coontent ['said-what'] 评论内容，使用 \n 分隔段落
 * @description 
 * @example
 *  {
 *      "product-info": {},
 *      "comments": [
 *          {
 *              "avatars-config": {
 *                  "fg_text": "一",
 *                  "fg_color": "#1a73e8",
 *                  "bg_color": "#4082fc",
 *                  "bg_type": 2
 *              },
 *              "user-name": "文文问",
 *              "post-date": "2019-5-18",
 *              "s": 100,
 *              "said-what": "很好，，，，很不错，，好，，，，，\n很好，，，，很不错，，，，。。。"
 *          },
 *          ...
 *          ...
 *      ]
 *  }
 */
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
// var content = {
//     "product-info": {},
//     "comments": [
//         {
//             "avatars-config": {
//                 "fg_text": "一",
//                 "fg_color": "#1a73e8",
//                 "bg_color": "#4082fc",
//                 "bg_type": 2
//             },
//             "user-name": "文文问",
//             "post-date": "2019-5-18",
//             "s": 100,
//             "said-what": "很好，，，，很不错，，好，，，，，很好，，，，很不错，，，，。。。"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "二",
//                 "fg_color": "#84ac52",
//                 "bg_color": "#25ca48",
//                 "bg_type": 0
//             },
//             "user-name": "用户2",
//             "post-date": "2019-5-10",
//             "s": 70,
//             "said-what": "just so so"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "三",
//                 "fg_color": "#594863",
//                 "bg_color": "#ac5385",
//                 "bg_type": 1
//             },
//             "user-name": "用户3",
//             "post-date": "2019-4-28",
//             "s": 60,
//             "said-what": "OKOKOOKOKOKOKOKKOK海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjOKOKOKOKOKOKOKOK"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "四",
//                 "fg_color": "#894acc",
//                 "bg_color": "#cca498",
//                 "bg_type": 3
//             },
//             "user-name": "用户3",
//             "post-date": "2019-4-9",
//             "s": 40,
//             "said-what": "OKOKOOKOKOKOKOKKOKOKOKOKOKO海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjKOKOKOK"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "五",
//                 "fg_color": "#88aacc",
//                 "bg_color": "#ccaa88",
//                 "bg_type": 4
//             },
//             "user-name": "用户3",
//             "post-date": "2019-4-2",
//             "s": 20,
//             "said-what": "海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskj"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "六",
//                 "fg_color": "#894acc",
//                 "bg_color": "#cca498",
//                 "bg_type": 3
//             },
//             "user-name": "用户3",
//             "post-date": "2019-3-21",
//             "s": 80,
//             "said-what": "OKOKOOKOKOKOKOKKOKOKOKOKOKO海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjKOKOKOK"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "七",
//                 "fg_color": "#88aacc",
//                 "bg_color": "#ccaa88",
//                 "bg_type": 4
//             },
//             "user-name": "用户3",
//             "post-date": "2019-3-18",
//             "s": 90,
//             "said-what": "海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskj"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "八",
//                 "fg_color": "#894acc",
//                 "bg_color": "#cca498",
//                 "bg_type": 3
//             },
//             "user-name": "用户3",
//             "post-date": "2019-3-15",
//             "s": 100,
//             "said-what": "OKOKOOKOKOKOKOKKOKOKOKOKOKO海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskjKOKOKOK"
//         },
//         {
//             "avatars-config": {
//                 "fg_text": "九",
//                 "fg_color": "#88aacc",
//                 "bg_color": "#ccaa88",
//                 "bg_type": 4
//             },
//             "user-name": "用户3",
//             "post-date": "2019-3-10",
//             "s": 10,
//             "said-what": "海星星星星星星星星星星星星星星星星星星星星星星星星，还行世纪东方松岛枫哦你师弟还是对赌关乎深度覆盖u很多覅古话说丢货\nkabskj"
//         }
//     ]
// }
http.createServer(function(req, res){
    res.writeHead(200, {"content-type": "text/html;charset=utf-8", "Access-Control-Allow-Origin": "*"});
    if(req.url != "/favicon.ico"){
        res.write(JSON.stringify(content));
        res.end();
    }
}).listen("2121");