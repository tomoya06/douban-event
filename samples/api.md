===无需登录===
https://api.douban.com/v2/event/list?loc=shanghai GET 获取城市活动
loc			城市id	
day_type	时间类型	future, week, weekend, today, tomorrow
type		活动类型	all,music, film, drama, commonweal, salon, exhibition, party, sports, travel, others

https://api.douban.com/v2/event/user_participated/70225597 GET 获取用户参加的活动
https://api.douban.com/v2/event/user_wished/70225597 GET 获取用户感兴趣的活动

活动类型 #
使用数字或者单词均可。

音乐 10/music
戏剧 11/drama
展览 12/exhibition
讲座 13/salon
聚会 14/party
运动 15/sports
旅行 16/travel
公益 17/commonweal
电影 18/film

scope: event_basic_r

    [读] GET /v2/event/:id 获取活动
    [读] GET /v2/event/:id/participants 获取参加活动的用户
    [读] GET /v2/event/:id/wishers 获取活动感兴趣的用户
    [读] GET /v2/event/user_created/:id 获取用户发起的活动
    [读] GET /v2/event/user_participated/:id 获取用户参加的活动
    [读] GET /v2/event/user_wished/:id 获取用户感兴趣的活动
    [读] GET /v2/event/list 获取活动列表
    [读] GET /v2/loc/:id 获取城市
    [读] GET /v2/loc/list 获取城市列表

scope: event_basic_w

    [写] POST /v2/event/:id/participants 参加活动
    [写] DELETE /v2/event/:id/participants 不参加活动
    [写] POST /v2/event/:id/wishers 对活动感兴趣
    [写] DELETE /v2/event/:id/wishers 对活动不感兴趣



===需要登陆===
// 登陆：https://www.douban.com/service/auth2/token?client_id=0b2bdeda43b5688921839c8ecb20399b&client_secret=822e2ca55c426005&grant_type=password&username=15767908157&password=peng-476612
https://www.douban.com/service/auth2/token?
	client_id=0b2bdeda43b5688921839c8ecb20399b&
	client_secret=822e2ca55c426005&
	grant_type=password&
	username=15767908157&
	password=peng-476612
// 之后添加header：Authorization: Bearer /token
//
https://api.douban.com/v2/event/29821951/wishers POST 添加活动感兴趣
https://api.douban.com/v2/event/29821951/wishers DELETE 取消活动感兴趣
https://api.douban.com/v2/event/29821951/participants POST 添加活动要参加
https://api.douban.com/v2/event/29821951/participants DELETE 取消活动要参加

// 查看授权用户信息
https://api.douban.com/v2/user/~me
// 未授权时：即不带token或token失效
{
    "msg": "need_permission",
    "code": 1000,
    "request": "GET /v2/user/~me"
}

// 已授权:
{
    "loc_id": "118288",
    "name": "tomoya06",
    "created": "2013-03-16 12:39:18",
    "is_banned": false,
    "is_suicide": false,
    "loc_name": "广东湛江",
    "avatar": "https://img3.doubanio.com/icon/u70225597-6.jpg",
    "signature": "我是签名档",
    "uid": "70225597",
    "alt": "https://www.douban.com/people/70225597/",
    "desc": "打分偏高，仅短期内有效 / 一个没有上进心的男子 / 短暫感官衝擊 / @Nanfang Rd. Studio ",
    "type": "user",
    "id": "70225597",
    "large_avatar": "https://img3.doubanio.com/icon/up70225597-6.jpg"
}


