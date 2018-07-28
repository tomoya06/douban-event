import ConvertPinyin from "./../utils/pinyin";
import BASE_URL from "./../utils/const";
// const Provinces =
// 	`河北省 山西省  辽宁省 吉林省 黑龙江省 江苏省 浙江省 安徽省 福建省 江西省` +
// 	`山东省 河南省 湖北省 湖南省 广东省 海南省 四川省 贵州省 云南省 陕西省 甘肃省 青海省 ` +
// 	`广西壮族自治区 内蒙古自治区 西藏自治区 宁夏回族自治区 新疆维吾尔自治区`
// 	;

// const DirectCities =
// 	`北京市 天津市 上海市 重庆市`
// 	;

// const PureProvinces =
// 	`河北 山西 辽宁 吉林 黑龙江 江苏 浙江 安徽 福建 江西 ` +
// 	`山东 河南 湖北 湖南 广东 海南 四川 贵州 云南 陕西 甘肃 青海 ` +
// 	`广西 内蒙古 西藏 宁夏 新疆`
// 	;

// const PureDirectCities =
// 	`北京 天津 上海 重庆`
// 	;

// const MapProvinves = PureProvinces.split(' ').sort((a, b) => {
// 	return a < b;
// }).map((pro) => {
// 	return {
// 		displayName: pro,
// 		pinyinName: ConvertPinyin(pro),
// 		depth: 1,
// 	}
// })
// const MapDirectCities = PureDirectCities.split(' ').sort((a, b) => {
// 	return a < b;
// }).map((city) => {
// 	return {
// 		displayName: city,
// 		pinyinName: ConvertPinyin(city),
// 		depth: 0,
// 	}
// })
// export const MapLocations = [...MapProvinves, ...MapDirectCities];
export const MapLocations = [{
	"displayName": "安徽", "pinyinName": "AnHui", "depth": 1
}, { "displayName": "北京", "pinyinName": "BeiJing", "depth": 0 
}, { "displayName": "福建", "pinyinName": "FuJian", "depth": 1 
}, { "displayName": "甘肃", "pinyinName": "GanSu", "depth": 1 
}, { "displayName": "广东", "pinyinName": "GuangDong", "depth": 1 
}, { "displayName": "广西", "pinyinName": "GuangXi", "depth": 1 
}, { "displayName": "贵州", "pinyinName": "GuiZhou", "depth": 1 
}, { "displayName": "海南", "pinyinName": "HaiNan", "depth": 1 
}, { "displayName": "河北", "pinyinName": "HeBei", "depth": 1 
}, { "displayName": "黑龙江", "pinyinName": "HeiLongJiang", "depth": 1 
}, { "displayName": "河南", "pinyinName": "HeNan", "depth": 1 
}, { "displayName": "湖北", "pinyinName": "HuBei", "depth": 1 
}, { "displayName": "湖南", "pinyinName": "HuNan", "depth": 1 
}, { "displayName": "江苏", "pinyinName": "JiangSu", "depth": 1 
}, { "displayName": "江西", "pinyinName": "JiangXi", "depth": 1 
}, { "displayName": "吉林", "pinyinName": "JiLin", "depth": 1 
}, { "displayName": "辽宁", "pinyinName": "LiaoNing", "depth": 1 
}, { "displayName": "内蒙古", "pinyinName": "NaMengGu", "depth": 1 
}, { "displayName": "宁夏", "pinyinName": "NingXia", "depth": 1 
}, { "displayName": "青海", "pinyinName": "QingHai", "depth": 1 
}, { "displayName": "山东", "pinyinName": "ShanDong", "depth": 1 
}, { "displayName": "上海", "pinyinName": "ShangHai", "depth": 0 
}, { "displayName": "山西", "pinyinName": "ShanXi", "depth": 1 
}, { "displayName": "陕西", "pinyinName": "ShanXi", "depth": 1 
}, { "displayName": "四川", "pinyinName": "SiChuan", "depth": 1 
}, { "displayName": "天津", "pinyinName": "TianJin", "depth": 0 
}, { "displayName": "西藏", "pinyinName": "XiCang", "depth": 1 
}, { "displayName": "新疆", "pinyinName": "XinJiang", "depth": 1 
}, { "displayName": "云南", "pinyinName": "YunNan", "depth": 1 
}, { "displayName": "浙江", "pinyinName": "ZheJiang", "depth": 1 
}, { "displayName": "重庆", "pinyinName": "ZhongQing", "depth": 0 
}];

export function fetchProvinceCities(proPY) {
	// const proPY = ConvertPinyin(pro);
	const CITIES_URL = `${BASE_URL}/event/list?loc=${proPY}`;
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
