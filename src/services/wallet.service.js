import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

export const getProviders = (id, token) => {
    return axios.post("/users/providers", {
        id: id,
        auth_key: token
    }).then(response => response)
}

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

export const savePlatformOauthToken = (id, token, provider, platform, code) => {
    return axios.post(`/${provider}/auth/success`, {
        id: id,
        auth_key: token,
        provider: provider,
        platform: platform,
        code: code
    }).then(response => response)
}

export const saveTwitterOauthToken = (id, token, provider, platform, oauth_token, oauth_verifier) => {
    return axios.post(`/${provider}/auth/success`, {
        id: id,
        auth_key: token,
        provider: provider,
        platform: platform,
        oauth_token: oauth_token,
        oauth_verifier: oauth_verifier
    }).then(response => response)
}