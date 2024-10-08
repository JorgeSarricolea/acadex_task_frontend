const BASE_URL = "http://localhost:8000/api/v1";

const endpoints = {
  signup: `${BASE_URL}/auth/signup`,
  login: `${BASE_URL}/auth/login`,
  getUser: (userId) => `${BASE_URL}/users/${userId}`,
};

export default endpoints;
