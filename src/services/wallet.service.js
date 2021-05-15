import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

export const getProviders = (auth_key) => {
    return axios.post("/users/providers", {
        auth_key: auth_key
    }).then(response => response)
}

export const getStoredTokens = (auth_key, provider) => {
    return axios.post("/users/stored_tokens", {
        auth_key: auth_key,
        provider: provider
    }).then(response => response)
};

export const getPlatformOauthToken = (auth_key, provider, platform) => {
    return axios.post("/users/tokens", {
        auth_key: auth_key,
        provider: provider,
        platform: platform
    }).then(response => response)
};

export const revokeToken = (auth_key, password, provider, platform) => {
    return axios.post("/users/tokens/revoke", {
        auth_key: auth_key,
        password: password,
        provider: provider,
        platform: platform
    }).then(response => response)
}

export const getGoogleOauthToken = (auth_key, data) => {
    return axios.post("/oauth2/google/code", {
        data: JSON.stringify(data),
        auth_key: auth_key
    }).then(response => response)
}
export const savePlatformOauthToken = (auth_key, provider, platform, code) => {
    return axios.post(`/${provider}/auth/success`, {
        auth_key: auth_key,
        provider: provider,
        platform: platform,
        code: code
    }).then(response => response)
}