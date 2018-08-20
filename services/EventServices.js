// import ConvertPinyin from "./../utils/pinyin";

import {
	BASE_URL,
	EVENT_LIST_BASE_URL,
	FAKE_DATA_00,
	FAKE_DATA_20,
} from "./../utils/const";

import {
	getToken,
	getUser,
} from "./StorageService";

import {
	isLogin
} from "./../services/UserServices";

import {
	getLocation,
} from "./../services/StorageService";

export const EVENT_DAY_TYPES = [
	{ displayName: '所有', typeName: '' },
	{ displayName: '今天', typeName: 'today' },
	{ displayName: '明天', typeName: 'tomorrow' },
	{ displayName: '周末', typeName: 'weekend' },
	{ displayName: '本周', typeName: 'week' },
];
export const EVENT_TYPES = [
	{ displayName: '所有', typeName: 'all' },
	{ displayName: '音乐', typeName: 'music' },
	{ displayName: '电影', typeName: 'film' },
	{ displayName: '戏剧', typeName: 'drama' },
	{ displayName: '公益', typeName: 'comonweal' },
	{ displayName: '沙龙', typeName: 'salon' },
	{ displayName: '展览', typeName: 'exhibition' },
	{ displayName: '聚会', typeName: 'party' },
	{ displayName: '运动', typeName: 'sports' },
	{ displayName: '旅行', typeName: 'travel' },
	{ displayName: '其他', typeName: 'others' }
];

export const USER_STATUS = {
	WISH: "wishers",
	WILL: "participants",
}

async function getEventListURL() {
	const getLocRes = await getLocation();
	if (getLocRes) {
		return `${EVENT_LIST_BASE_URL}?loc=${getLocRes.id}`;
	} else {
		return `${EVENT_LIST_BASE_URL}`;
	}
}

export async function fetchEventDetails(id) {

	let fetchOption = {};
	const isLoginRes = await isLogin();
	console.log(isLoginRes);
	if (isLoginRes !== null) {
		fetchOption = {
			headers: {
				'Authorization': `Bearer ${isLoginRes.access_token}`,
			}
		}
	}

	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/event/${id}`, fetchOption)
			.then((response) => response.json())
			.then((jRes) => {
				return resolve([null, jRes]);
			})
			.catch((error) => {
				return resolve([error, null]);
			})
	})
}

export async function fetchCityEvents(city, day_type = '', event_type = '', start_index = 0) {
	// const cityPY = ConvertPinyin(city);
	// const EVENTS_URL = `${BASE_URL}/event/list?loc=${cityPY}&day_type=${day_type}&type=${event_type}&start=${start_index}`;
	// const EVENTS_URL = start_index == 0 ? FAKE_DATA_00 : FAKE_DATA_20;
	const EVENTS_URL = await getEventListURL();
	return new Promise((resolve, reject) => {
		console.log("fetching events from...", EVENTS_URL);
		fetch(EVENTS_URL)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				return resolve(json);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}

/**
 * 
 * @param {string} id event ID
 * @param {string} userStatus CONST.js USER_STATUS
 * @param {boolean} flagID true: add mark / false: delete mark
 */
export function markEvent(id, userStatus, flagID = true) {
	return new Promise(async (resolve, reject) => {

		const _status = userStatus;
		const _method = flagID ? 'POST' : 'DELETE';
		const markURL = `${BASE_URL}/event/${id}/${userStatus}`;

		console.log(`Marking Event ${id} as ${_status} with ${_method} `);

		const markOption = {
			method: _method,
		}
		const isLoginRes = await isLogin();
		if (isLoginRes !== null) {
			markOption.headers = {
				'Authorization': `Bearer ${isLoginRes.access_token}`,
			}
		}

		fetch(markURL, markOption)
			.then((response) => {
				console.log(response);
				if (response.ok) { return response.json(); }
				throw new Error(response.status);
			})
			.then((jRes) => {
				if (typeof jRes.msg !== 'undefined') { throw new Error(jRes.msg); }
				return resolve(true);
			})
			.catch((error) => {
				return resolve(false);
			})
	})
}