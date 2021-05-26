import axios from 'axios';
import { getToken } from "services/auth.service";

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

let authObj = getToken();
let AUTH_KEY = authObj?.auth_key;
let AUTH_ID = authObj?.id;

export const getProviders = () => {
    return axios.post("/users/providers", {
        id: AUTH_ID,
        auth_key: AUTH_KEY
    }).then(response => response)
}

export const getStoredTokens = (provider) => {
    return axios.post("/users/stored_tokens", {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        provider: provider
    }).then(response => response)
};

export const getPlatformOauthToken = (provider, platform) => {
    return axios.post("/users/tokens", {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        provider: provider,
        platform: platform
    }).then(response => response)
};

export const revokeToken = (password, provider, platform) => {
    return axios.post("/users/tokens/revoke", {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        password: password,
        provider: provider,
        platform: platform
    }).then(response => response)
}

export const getGoogleOauthToken = (data) => {
    return axios.post("/oauth2/google/code", {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        data: JSON.stringify(data)
    }).then(response => response)
}
export const savePlatformOauthToken = (provider, platform, code) => {
    //renew auth data
    authObj = getToken();
    AUTH_KEY = authObj.auth_key;
    AUTH_ID = authObj.id;

    return axios.post(`/${provider}/auth/success`, {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        provider: provider,
        platform: platform,
        code: code
    }).then(response => response)
}