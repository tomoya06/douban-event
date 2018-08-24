import {
    isLogin,
} from "./UserServices";

import {
    BASE_URL,
} from "./../utils/const";

function getCollectionsPromise(user_id, colType) {
    return new Promise((resolve, reject) => {
        const fetchURL = `${BASE_URL}/event/${colType}/${user_id}`;
        fetch(fetchURL)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((jRes) => {
                console.log(jRes);
                return resolve([null, jRes]);
            })
            .catch((error) => {
                console.error(error);
                return resolve([error, null]);
            })
    })
}

export async function getCollections(user_id, colType) {
    const [error, result] = await getCollectionsPromise(user_id, colType);
    if (error) return null;
    return result.events;
}