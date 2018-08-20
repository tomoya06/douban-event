import {
    setUserInfo,
    getUserInfo,
    setUserLogin,
    getUserLogin,
    setToken,
    getToken,
    getLoginDate,
} from "./StorageService";

import {
    AUTH_URL,
} from "./../utils/const";

import {
    urlBuilder,
} from "./../utils/urlBuilder";

const CLIENT_ID = '0b2bdeda43b5688921839c8ecb20399b';
const CLIENT_SECRET = '822e2ca55c426005';
const GRAND_TYPE = 'password';

function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        const loginForm = new FormData();
        loginForm.append('client_id', CLIENT_ID);
        loginForm.append('client_secret', CLIENT_SECRET);
        loginForm.append('grant_type', GRAND_TYPE);
        loginForm.append('username', username);
        loginForm.append('password', password);

        const loginHeaders = new Headers({
            'Content-Type': 'multipart/form-data',
        })

        const loginConfig = {
            method: 'POST',
            headers: loginHeaders,
            body: loginForm,
        }

        fetch(AUTH_URL, loginConfig)
            .then((response) => {
                if (response.ok) { return response.json(); }
                throw new Error(response.status);
            })
            .then((jRes) => {
                if (typeof jRes.msg !== 'undefined') { throw new Error('user info mismatched'); }
                return resolve([null, jRes]);
            })
            .catch((error) => {
                return resolve([error, null]);
            })
    })
}

export async function userLoginService(username, password) {
    const [loginError, loginRes] = await userLogin(username, password);
    if (loginError) { return false; }
    try {
        const setTokenRes = await setToken(loginRes);
        const setUserLoginRes = await setUserLogin({ username, password });
        const setLoginDate = await setLoginDate({ date: (new Date()).getTime() });
        if (setTokenRes && setUserLoginRes && setLoginDate) {
            // const curToken = await getToken();
            return true;
        }
        throw new Error('storage failed');
    } catch (error) {
        return false;
    }
}

export async function userLogoutService() {
    const logoutUserRes = await setUserLogin(null);
    const logoutTokenRes = await setToken(null);
    return (logoutUserRes && logoutTokenRes);
}

export async function autoLogin() {
    const curUserLogin = await getUserLogin();
    if (curUserLogin == null) { return false; }
    if (!isTokenExpired) { return true; }
    const { username, password } = curUserLogin;
    const loginRes = await userLoginService(username, password);
    return loginRes;
}

export async function isLogin() {
    const curUserLogin = await getUserLogin();
    const curToken = await getToken();
    if (curUserLogin !== null && curToken !== null) { return curToken; }
    return null;
}

export async function isTokenExpired() {
    const curLoginDate = await getLoginDate();
    const FIVEDAYS = 24 * 60 * 60 * 5;
    const currentTS = (new Date()).toString();
    return (currentTS - curLoginDate > FIVEDAYS);
}