// session and local storage management

// caching temporal data for immediate use
export const setCache = (state) => {
  sessionStorage.setItem("SWOBCACHE", JSON.stringify(state));
};

export const getCache = () => {
  return JSON.parse(sessionStorage.getItem("SWOBCACHE"));
};

export const clearCache = () => {
  sessionStorage.removeItem("SWOBCACHE");
};

/*
 used for persisting state after window refresh
check utils/persist for implementation
*/
export const setLocalState = (state) => {
  sessionStorage.setItem("SWOBSTORE", JSON.stringify(state));
};

export const getLocalState = () => {
  return JSON.parse(sessionStorage.getItem("SWOBSTORE"));
};

export const clearLocalState = () => {
  sessionStorage.removeItem("SWOBSTORE");
};
