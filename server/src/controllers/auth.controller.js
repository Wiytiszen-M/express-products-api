const { registerUser, loginUser } = require("../services/auth.service");
const sendResponse = require("../utils/sendResponse");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser({
    name,
    email,
    password,
  });

  return sendResponse(res, 201, "User registered successfully", user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser({
    email,
    password,
  });

  return sendResponse(res, 200, "User logged in successfully", user);
};

module.exports = {
  register,
  login,
};
