import {
	AsyncStorage,
} from "react-native";

const LOCATION_KEY = 'LOCATION';
const TOKEN_KEY = 'ACCESS_TOKEN';
const USER_KEY = 'USER_INFO';

function setStorageFunctionFactory(KEY) {
	return async function (data) {
		try {
			let jData;
			if (typeof data !== 'string') {
				jData = JSON.stringify(data);
			} else {
				jData = data;
			}
			await AsyncStorage.setItem(KEY, jData);
			console.log('success');
			return true;
		} catch (error) {
			console.log('fail', error);
			return false;
		}
	}
}

function getStorageFunctionFactory(KEY) {
	return async function () {
		try {
			const value = await AsyncStorage.getItem(KEY);
			const jValue = JSON.parse(value);
			return jValue;
		} catch (error) {
			return null;
		}
	}
}

/**
 * LOCATION FORMAT:
 * JSON.stringify({
 * 		id: id,
 * 		displayName: displayName,
 * })
 */
export const setLocation = setStorageFunctionFactory(LOCATION_KEY);
export const getLocation = getStorageFunctionFactory(LOCATION_KEY);

/**
 * TOKEN FORMAT: 
 * JSON.stringify({
    "access_token": "b32a007f2970966a197e017d7c51c33e",
    "douban_user_name": "tomoya06",
    "douban_user_id": "70225597",
    "expires_in": 7775999,
    "refresh_token": "ce8003d14f3042f06b800b73ed90c8d0"
})
 */
export const setToken = setStorageFunctionFactory(TOKEN_KEY);
export const getToken = getStorageFunctionFactory(TOKEN_KEY);

/**
 * USER INFO FORMAT:
 * JSON.stringify({
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
})
 */
export const setUser = setStorageFunctionFactory(USER_KEY);
export const getUser = getStorageFunctionFactory(USER_KEY);