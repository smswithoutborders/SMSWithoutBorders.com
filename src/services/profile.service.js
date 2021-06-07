import axios from 'axios';

let AUTH_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = AUTH_URL;

export const getProfileInfo = (id, token) => {
    return axios.post("/users/profiles/info", {
        id: id,
        auth_key: token
    }).then(response => response)
}
