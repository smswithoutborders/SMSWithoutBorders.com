import axios from 'axios';

let AUTH_URL = process.env.REACT_APP_API_URL;
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

export const verifyCode = (code, session_id, auth_key) => {
    return axios.post("/users/profiles/register/2fa",
        {
            code: code,
            session_id: session_id,
            auth_key: auth_key
        }).then(response => response)
}

export const userLogin = async (phonenumber, password) => {
    return axios.post("/users/profiles/login",
        {
            phone_number: phonenumber,
            password: password
        }).then(response => response)
};
