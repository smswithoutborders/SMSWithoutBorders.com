import axios from 'axios';

let AUTH_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = AUTH_URL;

export const registerUser = ({ username, country_code, phone_number, password }) => {
    return axios.post("/users/profiles/register",
        {
            name: username,
            country_code: country_code,
            phone_number: phone_number,
            password: password,

        }).then(response => response)
}

export const verifyCode = (code, session_id, svid) => {
    return axios.post("/users/profiles/register/2fa",
        {
            code: code,
            session_id: session_id,
            svid: svid
        }).then(response => response)
}

export const userLogin = (phone_number, password) => {
    return axios.post("/users/profiles/login",
        {
            phone_number: phone_number,
            password: password
        }).then(response => response)
};

export const resetPassword = (phone_number) => {
    return axios.post("users/profiles/password/recovery", {
        phone_number: phone_number,
    }).then(response => response)
}

export const verifyResetCode = (code, session_id, svid) => {
    return axios.post("/users/profiles/password/recovery/2fa", {
            code: code,
            session_id: session_id,
            svid: svid
        }).then(response => response)
}

export const changePassword = (auth_key, password) => {
    return axios.post("/users/profiles/password/recovery/new", {
        auth_key: auth_key,
        new_password: password,
    }).then(response => response)
}

