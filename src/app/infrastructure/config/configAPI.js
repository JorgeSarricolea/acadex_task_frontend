const BASE_URL = "http://localhost:8000/api/v1";

const endpoints = {
  signup: `${BASE_URL}/auth/signup`,
  login: `${BASE_URL}/auth/login`,
  validateToken: `${BASE_URL}/auth/validate-token`,

  // Users
  getUserById: (userId) => `${BASE_URL}/users/${userId}`,
  updateUser: (userId) => `${BASE_URL}/users/${userId}`,

  // Homeworks
  getAllHomeworks: `${BASE_URL}/homeworks`,
  getHomeworkById: (homeworkId) => `${BASE_URL}/homeworks/${homeworkId}`,
  updateHomework: (homeworkId) => `${BASE_URL}/homeworks/${homeworkId}`,
  deleteHomework: (homeworkId) => `${BASE_URL}/homeworks/${homeworkId}`,
  createHomework: `${BASE_URL}/homeworks`,

  // Categories
  getAllCategories: `${BASE_URL}/categories`,
  getCategoryById: (categoryId) => `${BASE_URL}/categories/${categoryId}`,
};

export default endpoints;
