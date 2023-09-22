import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3001"
});

export async function externalGet(url, token) {
    const headers = {
        "X-API-KEY": token,
    };

    const { data } = await axios.get(url, { headers });
    return data;
}
export async function get(url) {
    const { data } = await client.get(url);
    return data;
}

export async function post(url, body) {
    const { data } = await client.post(url, body);
    return data;
}
export async function del(url) {
    const { data } = await client.delete(url);
    return data;
}

