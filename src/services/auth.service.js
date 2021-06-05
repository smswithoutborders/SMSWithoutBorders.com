import axios from 'axios';

let AUTH_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = AUTH_URL;

export const registerUser = (name, phonenumber, country_code, password) => {
    return axios.post("/users/profiles/register",
        {
            name: name,
            phone_number: phonenumber,
            password: password,
            country_code: country_code
        }).then(response => response)
}

export const userLogin = async (phonenumber, password) => {
    return axios.post("/users/profiles/login",
        {
            phone_number: phonenumber,
            password: password
        }).then(response => response)
};

export const getToken = () => {
    return JSON.parse(sessionStorage.getItem('SWOB_KEY'));
};

export const setToken = (token) => {
    sessionStorage.setItem('SWOB_KEY', JSON.stringify(token));
};

export const removeToken = () => {
    sessionStorage.removeItem('SWOB_KEY');
}
