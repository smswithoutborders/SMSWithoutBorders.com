import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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