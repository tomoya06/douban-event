import {
	AsyncStorage,
} from "react-native";

const LOCATION_KEY = 'LOCATION';
const TOKEN_KEY = 'ACCESS_TOKEN';
const USER_KEY = 'USER_INFO';
const USER_LOGIN_KEY = 'USER_LOGIN';

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
 * USER LOGIN FORMAT:
 * JSON.stringify({
 * 		username: 'tomoya06',
 * 		password: 'password',
 * })
 */
export const setUserLogin = setStorageFunctionFactory(USER_LOGIN_KEY);
export const getUserLogin = getStorageFunctionFactory(USER_LOGIN_KEY);
