import {
    isLogin,
} from "./UserServices";

import {
    BASE_URL,
} from "./../utils/const";

export async function getLikeCover() {

}

export async function getInCover() {
    
}

export async function getCollections(user_id, colType, startIndex) {
    return new Promise((resolve, reject) => {
        const fetchURL = `${BASE_URL}/event/${colType}/${user_id}?start=${startIndex}`;
        console.log(fetchURL);
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
                console.log(error);
                return resolve([error, null]);
            })
    })
}