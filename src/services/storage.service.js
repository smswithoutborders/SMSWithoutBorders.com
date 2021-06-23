
export const setLocalState = (state) => {
    sessionStorage.setItem("SWOB", JSON.stringify(state))
}

export const getLocalState = () => {
    return JSON.parse(sessionStorage.getItem("SWOB"));
}

export const clearLocalState = () => {
    sessionStorage.removeItem("SWOB");
}


export const getToken = () => {
    return JSON.parse(sessionStorage.getItem('SWOB_KEY'));
};

export const setToken = (token) => {
    sessionStorage.setItem('SWOB_KEY', JSON.stringify(token));
};

export const removeToken = () => {
    sessionStorage.removeItem('SWOB_KEY');
}

export const getProfile = () => {
    return JSON.parse(sessionStorage.getItem("SWOB_USER"));
}

export const setProfile = (profile) => {
    removeProfile()
    sessionStorage.setItem('SWOB_USER', JSON.stringify(profile));
}

export const removeProfile = () => {
    sessionStorage.removeItem("SWOB_USER");
}