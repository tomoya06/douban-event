import {
	AsyncStorage,
} from "react-native";

const LOCATION_KEY = 'LOCATION';

function setStorageFunctionFactory(KEY) {
	return async function (data) {
		try {
			const jData = JSON.stringify(data);
			await AsyncStorage.setItem(KEY, jData);
			console.log('success');
			return true;
		} catch (error) {
			console.log('fail');
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

