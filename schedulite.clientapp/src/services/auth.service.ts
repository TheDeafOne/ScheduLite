import axios from "../api/axios-config";

const authPrefix = 'auth'
class AuthService {
  login(username: string, password: string) {
    return axios
      .post(authPrefix + "/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          response.data.password = password;
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");

  }

  register(username: string, email: string, password: string) {
    return axios.post(authPrefix + "/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}
// eslint-disable-next-line
export default new AuthService();
