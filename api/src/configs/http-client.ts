import axios from "axios";

export const httpClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        apikey: process.env.API_KEY,
    }
})