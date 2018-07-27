import ConvertPinyin from "./../utils/";

const EVENT_DETAILS_BASEAPI = 'https://api.douban.com/v2';
const EVENT_DAY_TYPE = {
	FUTURE: {displayName: '未来', typeName: 'future'},
	WEEK: {displayName: '本周', typeName: 'week'},
	WEEKEND: {displayName: '周末', typeName: 'weekend'},
	TODAY: {displayName: '今天', typeName: 'today'},
	TOMORROW: {displayName: '明天', typeName: 'tomorrow'}
}
const EVENT_TYPE = {
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
		fetch(`${EVENT_DETAILS_BASEAPI}/event/${id}`)
			.then((response) => response.json())
			.then((json) => {
				return resolve(json);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}

export function fetchCityEvent(city) {
	const cityPY = ConvertPinyin(city);
	const EVENTS_URL = `${EVENT_DETAILS_BASEAPI}/event/list?loc=${cityPY}`;
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