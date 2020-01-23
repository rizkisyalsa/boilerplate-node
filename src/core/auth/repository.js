const { pool } = require("../database");

const getAuth = async username => {
  const text = "SELECT * FROM users WHERE username = $1";
  const value = [username];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const getUser = async id => {
  const text = "SELECT * FROM users WHERE id=$1";
  const value = [id];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const checkUsername = async username => {
  const text = "SELECT * FROM users WHERE username=$1";
  const value = [username];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

const createUser = async (username, hashPassword, name, role) => {
  const text =
    "INSERT INTO users (username, password, name, role) VALUES($1, $2, $3, $4) RETURNING *";
  const value = [username, hashPassword, name, role];

  try {
    const data = await pool.query(text, value);
    return data.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAuth,
  getUser,
  checkUsername,
  createUser
};
