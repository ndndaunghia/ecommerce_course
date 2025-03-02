const AUTH_TOKEN_STORE_KEY = 'token';

export const removeAuthToken = () => {
  return localStorage.removeItem(AUTH_TOKEN_STORE_KEY);
}

export const setAuthToken = (token) => {
  return localStorage.setItem(AUTH_TOKEN_STORE_KEY, token);
}

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

export const hasAuthToken = () => {
  return !!getAuthToken();
}

export const removeItem = (name) => {
  return localStorage.removeItem(name);
}

export const setUserId = (userId) => {
  return localStorage.setItem('userId', userId);
}

export const getUserId = () => {
  return localStorage.getItem('userId');
}

export const removeUserId = () => {
  return localStorage.removeItem('userId');
}