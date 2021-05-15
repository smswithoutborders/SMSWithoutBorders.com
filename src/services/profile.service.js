import axios from 'axios';
import { getToken } from "services/auth.service";

let AUTH_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = AUTH_URL;

let AUTH_KEY = getToken();

export const getProfileInfo = () => {
    return axios.post("/users/profiles/info", {
        auth_key: AUTH_KEY
    }).then(response => response)
}