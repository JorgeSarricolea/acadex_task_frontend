const BASE_URL = "http://localhost:8000/api/v1";

const endpoints = {
  signup: `${BASE_URL}/auth/signup`,
  login: `${BASE_URL}/auth/login`,
  validateToken: `${BASE_URL}/auth/validate-token`,

  // Users
  getUserById: (userId) => `${BASE_URL}/users/${userId}`,
  updateUser: (userId) => `${BASE_URL}/users/${userId}`,
};

export default endpoints;
