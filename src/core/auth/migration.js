const bcrypt = require("bcryptjs")

let migration = async (client) => {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS users( id serial PRIMARY KEY, username VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (100) NOT NULL, name VARCHAR (50), role VARCHAR (10))"
    );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("admin", salt);
    let queryFirstUser =
      "INSERT INTO users (username, password, name, role) VALUES($1, $2, $3, $4) RETURNING *";
    let valueFirstUser = ["admin", hashPassword, "admin", "admin"];

    let res = await client.query(queryFirstUser, valueFirstUser);
    if (res) {
      console.log("Username and password have been created");
      console.log({
        username: "admin",
        password: "admin"
      });
    }
  } catch (err) {
    console.log(err.message);
    console.log({
      username: "admin",
      password: "admin"
    });
  }
}

module.exports = {
  migration
};