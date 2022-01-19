// session and local storage management

export const setCache = (state) => {
  sessionStorage.setItem("SWOB", JSON.stringify(state));
};

export const getCache = () => {
  return JSON.parse(sessionStorage.getItem("SWOB"));
};

export const clearCache = () => {
  sessionStorage.removeItem("SWOB");
};
