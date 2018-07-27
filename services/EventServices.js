import ConvertPinyin from "./../utils/pinyin";

import BASE_URL from "./../utils/const";

export const EVENT_DAY_TYPES = {
	FUTURE: {displayName: '未来', typeName: 'future'},
	WEEK: {displayName: '本周', typeName: 'week'},
	WEEKEND: {displayName: '周末', typeName: 'weekend'},
	TODAY: {displayName: '今天', typeName: 'today'},
	TOMORROW: {displayName: '明天', typeName: 'tomorrow'}
}
export const EVENT_TYPES = {
	ALL: {displayName: '所有', typeName: 'all'},
	MUSIC: {displayName: '音乐', typeName: 'music'},
	FILM: {displayName: '电影', typeName: 'film'},
	DRAMA: {displayName: '戏剧', typeName: 'drama'},
	COMMONWEAL: {displayName: '公益', typeName: 'comonweal'},
	SALON: {displayName: '沙龙', typeName: 'salon'},
	EXHIBITION: {displayName: '展览', typeName: 'exhibition'},
	PARTY: {displayName: '聚会', typeName: 'party'},
	SPORTS: {displayName: '运动', typeName: 'sports'},
	TRAVEL: {displayName: '旅行', typeName: 'travel'},
	OTHERS: {displayName: '其他', typeName: 'others'}
}

export function fetchEventDetails(id) {
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/event/${id}`)
			.then((response) => response.json())
			.then((json) => {
				return resolve(json);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}

export function fetchCityEvent(city, day_type='', event_type='') {
	const cityPY = ConvertPinyin(city);
	const EVENTS_URL = `${BASE_URL}/event/list?loc=${cityPY}&day_type=${day_type}&type=${event_type}`;
	return new Promise((resolve, reject) => {
		fetch(EVENTS_URL)
			.then((response) => response.json())
			.then((json) => {
				return resolve(json);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}