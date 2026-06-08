const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const AppError = require("../errors/AppError");
const generateToken = require("../utils/generateToken");

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

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };

  const token = generateToken(safeUser);

  return {
    user: safeUser,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
