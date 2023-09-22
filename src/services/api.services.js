import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3001"
})

export async function addToFavCharacters(body) {
    const { data } = await client.post("/favCharacters", body);
    return data;
}
export async function addToLikedCharacters(body) {
    const { data } = await client.post("/likedCharacters", body);
    return data;
}