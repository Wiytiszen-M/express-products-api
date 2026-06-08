const userRepository = require("../repositories/user.repository");
const AppError = require("../errors/AppError");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const newUser = await userRepository.create({
    name,
    email,
    password,
  });

  return newUser;
};

module.exports = {
  registerUser,
};
