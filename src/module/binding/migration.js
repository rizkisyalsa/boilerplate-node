let migration = async client => {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS bind_obu_dana( id_obu VARCHAR(50) PRIMARY KEY NOT NULL, nama VARCHAR(50) NOT NULL, no_hp VARCHAR(12) NOT NULL, plat_no VARCHAR(10) NOT NULL, gol VARCHAR (3), status VARCHAR (10), created_at TIMESTAMP)"
    );
    console.log("Table bind_obu_dana has been created");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  migration
};
