export const BASE_URL = 'https://api.douban.com/v2';
export const AUTH_URL = 'https://www.douban.com/service/auth2/token';
export const ME_URL = 'https://api.douban.com/v2/user/~me';

export const USER_STATUS = {
    wish: 'wishers',
    in: 'participants',
    '感兴趣': 'wishers',
    '要参加': 'participants',
    wishCN: '感兴趣',
    inCN: '要参加',
}

export const FAKE_DATA_20 = 'https://raw.githubusercontent.com/tomoya06/react-native-douban-event/master/samples/20events.json';
export const FAKE_DATA_00 = 'https://raw.githubusercontent.com/tomoya06/react-native-douban-event/master/samples/allevents.json';

export const EVENT_LIST_BASE_URL = 'https://api.douban.com/v2/event/list';

export const DEFAULT_LOCATION = {
	id: '118281',
	displayName: '广州'
}