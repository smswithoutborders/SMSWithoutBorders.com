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
 used for persisting state with sessionStorage
 https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/
export const persistState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("SWOBSTORE", serializedState);
  } catch (err) {
    // do nothing with this error just catching for safety
  }
};

export const getPersistedState = () => {
  try {
    const serializedState = sessionStorage.getItem("SWOBSTORE");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const clearPersistedState = () => {
  sessionStorage.removeItem("SWOBSTORE");
};
