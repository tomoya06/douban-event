import ConvertPinyin from "./../utils/pinyin";

// const Provinces =
// 	`河北省 山西省  辽宁省 吉林省 黑龙江省 江苏省 浙江省 安徽省 福建省 江西省` +
// 	`山东省 河南省 湖北省 湖南省 广东省 海南省 四川省 贵州省 云南省 陕西省 甘肃省 青海省 ` +
// 	`广西壮族自治区 内蒙古自治区 西藏自治区 宁夏回族自治区 新疆维吾尔自治区`
// 	;

// const DirectCities =
// 	`北京市 天津市 上海市 重庆市`
// 	;

const PureProvinces =
	`河北 山西 辽宁 吉林 黑龙江 江苏 浙江 安徽 福建 江西 ` +
	`山东 河南 湖北 湖南 广东 海南 四川 贵州 云南 陕西 甘肃 青海 ` +
	`广西 内蒙古 西藏 宁夏 新疆`
	;

const PureDirectCities =
	`北京 天津 上海 重庆`
	;

const MapProvinves = PureProvinces.split(' ').map((pro) => {
	return {
		displayName: pro,
		pinyinName: ConvertPinyin(pro),
		depth: 1,
	}
})
const MapDirectCities = PureDirectCities.split(' ').map((city) => {
	return {
		displayName: city,
		pinyinName: ConvertPinyin(city),
		depth: 0,
	}
})
export const MapLocations = [...MapProvinves, ...MapDirectCities];

export function fetchProvinceCities(pro) {
	const proPY = ConvertPinyin(pro);
	const CITIES_URL = `https://api.douban.com/v2/event/list?loc=${proPY}`;
	return new Promise((resolve, reject) => {
		fetch(CITIES_URL)
			.then((response) => response.json())
			.then((json) => {
				return resolve(json.districts);
			})
			.catch((error) => {
				return reject(error);
			})
	})
}
