### 一场活动主要信息：

* image / image_hlarge / image_lmobile

* title

* tags
    * category(EN)/sategory_name(CN)/subcategory_name(CN)

* time_str / begin_time / end_time
* address / geo(FOR MAP)
* fee_str(ticket/fee cost)

* wisher_count / participant_count
* STATUS!!!! (GET WITH AUTH)(要参加/感兴趣)

* content(HTML)
* owner : avatar, name

* alt

### 登陆逻辑

* 在HomeScreen的初始化阶段进行一次登陆/token刷新操作。
* 之后的所有请求不再尝试登陆。直接读取存储的token然后进行请求操作。

* 因此除了登陆，其他时候只需直接读取token/判断token是否有效期内，便可进行后续请求。

### 目前使用到的第三方库
react-native-easy-grid
react-native-swiper
@shoutem
react-native-progress 