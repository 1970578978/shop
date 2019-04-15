# Api文档说明
# 1 前言
## 1.1 编写目的
信息系统不可避免会与三方系统产生交互，本文将会定义信息系统体系下所有接口文档的一些通用约定。
API设计开发完成后，在保证API完整性和稳定性的情况下，需要对API接口进行详细的说明，本文档将约定如何对API接口进行说明。
注：本文档中所提及接口，都是信息系统对外提供的接口，接口作为被调用方，而不是指三方系统需要ERP去调用的接口。
## 1.2 预期读者
- 系统接口设计开发员
- 系统接口使用员
- 系统三方对接公司
## 1.3 关于API设计开发
为信息系统开发的API需要仔细考虑，API地址名称、API输入参数、API返回值都应经过严格推敲，API是提供外部三方调用，需要经过雅阁测试，特别是对于会修改系统数据的API要有严格的参数验证和安全性验证。

# 2 API公共说明
API公共说明需要明确API相关公共属性，包含但不局限于以下表格内容。
api公共属性 | 值
---|-------
API集名称 | shop电子商务系统接口
API集说明 | 提供shop项目的用户认证以及其他信息
API基地址 | API所在域名：shop.yixinping.cn
支持协议  | https
API基本结构 | 失败返回:{"error":""};成功返回：{"messag":""}
鉴权说明 | 无
API规约 | <li> API命名必须体现API的实际意义、一目了然，通过名称就可以基本确定API的作用，命名采用完整英文单词，多个单词用中中划线分割、名称区分大小写。例如。forgot-password、resent-password. <li> 所以API请求头必须用header参数：Accept: application/json<br><font size="1">*应对API命名、入参、响应结果、字段名称、对象定义等进行规约，并在公共说明中体现。*</font>
# 3 文档API索引
API地址 | API中文名 | API说明
---|---|---
[api/register](#register) | 用户注册 | 注册用户信息获取token
[api/login](#login) | 用户登录 | 使用账号密码获取token
[api/resend-email](#resend-email) | 重新发送认证邮箱邮件 | 用户通过认证后发送认证邮箱的邮件

# 4 单个API说明
API文档需要对每一个对外提供的接口进行详细的说明，详细说明至少包含API基本信息、API输入参数、API响应结果、API中涉及到的所有对象、枚举内容。
## 4.1 API基本信息
|API地址 | API类别 | 请求方法 | API请求参数及说明 | API响应结果|
|---|---|---|-----|---|
|<span id="register">api/register</span> | 插入数据 | POST | body参数：<pre>name=(string)用户姓名;<br>email=(string)注册邮箱;<br>password=(string)用户密码;<br>c_password=(string)确认密码;</pre> | 失败：<pre>{error:{<br>[参数1:message],<br>[参数2:message]<br>...<br>}};</pre>   成功：<pre>{token:用户登录token,<br>refresh_token:刷新toke用来更新登录token,<br>token_type:认证类型,<br>expires_in:token存活时间,<br>name:用户姓名};</pre>|
|<span id="login">api/login</span> | 查询数据 | POST | body参数：<pre>email=(string)用户登录邮箱;<br>password=(string)登录密码;</pre> | 失败：<pre>{error:message};</pre>成功：<pre>{token:{<br>token_type:"Bearer",//认证类型<br>expirse_in:1296000,//token存活时间<br>access_token:"eyJ0eXAiOiJKV1QiLCJhbGciOi.....",//token<br>"refresh_token": "def50200..."//刷新token<br>},<br>name:"jiangzheng"}</pre> |
|<span id="resend-email">api/resend-email</span> | 查询数据 | POST | header参数：<pre>Authorization:Bearer eyJ0eXAiOiJKV...//认证类型bearer加空格后加token</pre> | 成功：<pre>{message:"发送成功"}</pre> 失败：<pre>{"message": "Unauthenticated."//未通过认证}</pre> |

