const bcrypt = require("bcryptjs");
const User = require("./repository");
const jwt = require("jsonwebtoken");
const config = require("../configs");
const { logger } = require("../logger");

const passwordIsMatch = async (username, password) => {
  try {
    let user = await User.getAuth(username);
    if (!user) {
      return {
        status: "error",
        message: "Incorrect username or password"
      };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: "error",
        message: "Incorrect username or password"
      };
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: "24h" // Expires in 24 hours
    });
    return {
      status: "success",
      data: {
        token: "Bearer " + token
      },
      message: "Token Created"
    };
  } catch (err) {
    logger.error(err.message);
    return {
      status: "error",
      message: err.message
    };
  }
};

const getLoggedIn = async id => {
  try {
    let user = await User.getUser(id);
    return {
      status: "success",
      data: { user }
    };
  } catch (err) {
    logger.error(err.message);
    return {
      status: "error",
      message: err.message
    };
  }
};

const createNewUser = async (createdId, username, password, name, role) => {
  try {
    let user = await User.getUser(createdId);
    if (user.role !== "admin") {
      return {
        status: "error",
        message: "To create a user, please contact admin"
      };
    }

    let userExist = await User.checkUsername(username);
    if (userExist) {
      return {
        status: "error",
        message: "Username already exists"
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await User.createUser(username, hashPassword, name, role);
    return {
      status: "success",
      data: { user: result },
      message: "User Created"
    };
  } catch (err) {
    console.log(err.message);
    return {
      status: "error",
      message: err.message
    };
  }
};

module.exports = {
  passwordIsMatch,
  getLoggedIn,
  createNewUser
}
