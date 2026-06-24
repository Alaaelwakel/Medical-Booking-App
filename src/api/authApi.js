import axiosInstance from "./axios";

// Generate fake JWT token
const generateFakeToken = () => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: Math.random().toString(36).substr(2, 9),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    }),
  );
  const signature = btoa("fake-signature");
  return `${header}.${payload}.${signature}`;
};

const authApi = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<{token, user}>}
   */
  login: async (credentials) => {
    try {
      const { email, password } = credentials;

      // Mock authentication - in real app, this would call backend
      const response = await axiosInstance.get("/users");
      const users = response.data;

      const user = users.find(
        (u) => u.email === email && u.password === password && !u.isBlocked,
      );

      if (!user) {
        throw new Error("Invalid credentials or user is blocked");
      }

      const token = generateFakeToken();

      // Persist token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
        },
      };
    } catch (error) {
      throw new Error(error.message || "Login failed", { cause: error });
    }
  },

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, role }
   * @returns {Promise<{success, user}>}
   */
  register: async (userData) => {
    try {
      const { name, email, password, role } = userData;

      // Check if user already exists
      const response = await axiosInstance.get("/users");
      const users = response.data;

      if (users.some((u) => u.email === email)) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser = {
        name,
        email,
        password,
        role,
        phone: "",
        isBlocked: false,
        createdAt: new Date().toISOString().split("T")[0],
      };

      const createResponse = await axiosInstance.post("/users", newUser);
      const createdUser = createResponse.data;

      const token = generateFakeToken();

      // Persist token and user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(createdUser));

      return {
        success: true,
        user: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          role: createdUser.role,
        },
      };
    } catch (error) {
      throw new Error(error.message || "Registration failed", { cause: error });
    }
  },

  /**
   * Logout user
   * @returns {Promise<boolean>}
   */
  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  },
};

export default authApi;
