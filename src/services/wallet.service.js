import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getStoredTokens = (auth_key, provider) => {
    return axios.post(API_URL + "/users/stored_tokens", {
        auth_key: auth_key,
        provider: provider
    })
        .then(response => response)
};

export const getOauthToken = async (provider) => {
    return await axios.get(API_URL + "/oauth2/" + provider + "/Tokens/")
        .then(response => response)
};