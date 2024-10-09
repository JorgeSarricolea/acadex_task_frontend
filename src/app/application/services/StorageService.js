const TOKEN_KEY = "authToken";
const USER_ID_KEY = "userId";
const USER_EMAIL_KEY = "userEmail";

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

export const removeToken = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_ID_KEY);
    sessionStorage.removeItem(USER_EMAIL_KEY);
  }
};
