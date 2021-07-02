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
    return axios.post("/users/password/new", {
        id: id,
        auth_key: token,
        password: password,
        new_password: new_password
    }).then(response => response)
}

export const addPhoneNumber = (id, token, country_code, phone_number) => {
    return axios.post("/users/profiles/info/new_number", {
        id: id,
        auth_key: token,
        country_code: country_code,
        new_phone_number: phone_number
    }).then(response => response)
}

export const verifyPhoneNumber = (code, session_id, svid) => {
    return axios.post("/users/profiles/info/new_number/2fa", {
        code: code,
        session_id: session_id,
        svid: svid
    }).then(response => response)
}

export const deleteAccount = (id, token, password) => {
    return axios.delete("/users/profiles/delete", {
        data: {
            id: id,
            auth_key: token,
            password: password
        }
    }).then(response => response)
}
