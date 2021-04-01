import axios from 'axios';
let AUTH_URL = process.env.REACT_APP_API_URL;

export const registerUser = (phonenumber, password) => {
    return axios.post(AUTH_URL + "/users/profiles/register",
        {
            phone_number: phonenumber,
            password: password
        })
        .then(response => response)
}

export const userLogin = async (phonenumber, password) => {
    return axios.post(AUTH_URL + "/users/profiles/login",
        {
            phone_number: phonenumber,
            password: password
        })
        .then(response => response)
};

export const getToken = () => {
    const token = sessionStorage.getItem('Deku-Auth_key');
    return token;
};

export const setToken = (token) => {
    sessionStorage.setItem('Deku-Auth_key', token);
};

export const removeToken = () => {
    sessionStorage.removeItem('Deku-Auth_key');
}

//setIsLoggedIn is parsed from the app component
export const logOut = (setIsLoggedIn) => {
    //log the user out by changing state
    setIsLoggedIn(false);
    //remove user token from session storage
    removeToken();
};
