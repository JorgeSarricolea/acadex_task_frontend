const TOKEN_KEY = "authToken";
const USER_ID_KEY = "userId";
const USER_EMAIL_KEY = "userEmail";
const USER_NAME_KEY = "userName";

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
};

export const setUserId = (userId) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(USER_ID_KEY, userId);
  }
};

export const setUserEmail = (email) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(USER_EMAIL_KEY, email);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(USER_ID_KEY);
  }
  return null;
};

export const getUserEmail = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(USER_EMAIL_KEY);
  }
  return null;
};

export const setUserName = (name) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(USER_NAME_KEY, name);
  }
};

export const getUserName = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(USER_NAME_KEY);
  }
  return null;
};

export const clearStorage = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_ID_KEY);
    sessionStorage.removeItem(USER_EMAIL_KEY);
    sessionStorage.removeItem(USER_NAME_KEY);
  }
};
