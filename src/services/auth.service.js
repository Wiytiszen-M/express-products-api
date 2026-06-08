const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const AppError = require("../errors/AppError");

const SALT_ROUNDS = 10;

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

module.exports = {
  registerUser,
};
