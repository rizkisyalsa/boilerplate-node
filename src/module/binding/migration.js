let migration = async client => {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS bind_obu_dana( id_obu VARCHAR(20) PRIMARY KEY NOT NULL, no_hp VARCHAR(50) NOT NULL, no_kend VARCHAR(50) NOT NULL, gol VARCHAR (5), status VARCHAR (10), created_at TIMESTAMP)"
    )
    console.log("Table bind_obu_dana has been created");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  migration
};