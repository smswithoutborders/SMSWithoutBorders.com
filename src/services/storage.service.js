
export const setLocalState = (state) => {
    localStorage.setItem("SWOB", JSON.stringify(state))
}

export const getLocalState = () => {
    return JSON.parse(localStorage.getItem("SWOB"));
}

export const clearLocalState = () => {
    localStorage.removeItem("SWOB");
}
