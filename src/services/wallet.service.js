import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProviders = (auth_key) => {
    return axios.post(API_URL + "/users/providers", {
        auth_key: auth_key
    }).then(response => response)
}

export const getStoredTokens = (auth_key, provider) => {
    return axios.post(API_URL + "/users/stored_tokens", {
        auth_key: auth_key,
        provider: provider
    }).then(response => response)
};

export const getPlatformOauthToken = (auth_key, provider, platform) => {
    return axios.post(API_URL + "/users/tokens", {
        auth_key: auth_key,
        provider: provider,
        platform: platform
    }).then(response => response)
};

export const revokeToken = (auth_key, password, provider, platform) => {
    return axios.post(API_URL + "/users/tokens/revoke", {
        auth_key: auth_key,
        password: password,
        provider: provider,
        platform: platform
    }).then(response => response)
}

export const getGoogleOauthToken = (auth_key, data) => {
    return axios.post(API_URL + "/oauth2/google/code", {
        data: JSON.stringify(data),
        auth_key: auth_key
    }).then(response => response)
}
export const getGoogleOauthRefreshToken = (access_token) => {
    return axios.get("https://www.googleapis.com/oauth2/v4/token", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then(response => response)
}