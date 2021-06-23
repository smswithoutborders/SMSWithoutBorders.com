import axios from 'axios';

let AUTH_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = AUTH_URL;

export const getProfileInfo = (id, token) => {
    return axios.post("/users/profiles/info", {
        id: id,
        auth_key: token
    }).then(response => response)
}

export const changePassword = (id, token, password, new_password) => {
    return axios.post("users/password/new", {
        id: id,
        auth_key: token,
        password: password,
        new_password: new_password
    }).then(response => response)
}
