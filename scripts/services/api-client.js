import { URL } from '../utils/constant.js';

export async function makeNetworkCall(){
    try {
        const res = await fetch(URL);
        const data = await res.json()
        return data;
    } catch (err) {
        console.err(err);
        throw err;
    }
}