import axios from 'axios';
import { getLocalState } from "services/storage.service";

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

let authObj = getLocalState();
let AUTH_KEY = authObj?.token;
let AUTH_ID = authObj?.id;

export const getProviders = (id, token) => {
    return axios.post("/users/providers", {
        id: id,
        auth_key: token
    }).then(response => response)
}

export const getStoredTokens = (provider) => {
    return axios.post("/users/stored_tokens", {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        provider: provider
    }).then(response => response)
};

export const getPlatformOauthToken = (id, token, provider, platform) => {
    return axios.post("/users/tokens", {
        id: id,
        auth_key: token,
        provider: provider,
        platform: platform
    }).then(response => response)
};

export const revokeToken = (id, token, password, provider, platform) => {
    return axios.post("/users/tokens/revoke", {
        id: id,
        auth_key: token,
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
export const savePlatformOauthToken = (id, token, provider, platform, code) => {
    //renew auth data
    return axios.post(`/${provider}/auth/success`, {
        id: AUTH_ID,
        auth_key: AUTH_KEY,
        provider: provider,
        platform: platform,
        code: code
    }).then(response => response)
}