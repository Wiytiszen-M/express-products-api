const { registerUser } = require("../services/auth.service");
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

module.exports = {
  register,
};
