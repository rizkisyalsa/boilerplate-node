const { pool } = require("../../core/database");

const getBinding = async (limit, page, search) => {
  let offset = 0;
  if (limit && page) {
    offset = (page - 1) * limit;
  }
  let values = [limit, offset];
  let count = `SELECT COUNT(*) AS total FROM bind_obu_dana`;
  let query = `SELECT * FROM bind_obu_dana`;
  if (search) {
    count += ` WHERE id_obu ILIKE '%${search}%' OR no_hp ILIKE '%${search}%' OR plat_no ILIKE '%${search}%' OR gol ILIKE '%${search}%'`;
    query += ` WHERE id_obu ILIKE '%${search}%' OR no_hp ILIKE '%${search}%' OR plat_no ILIKE '%${search}%' OR gol ILIKE '%${search}%'`;
  }
  query += ` ORDER BY created_at LIMIT $1 OFFSET $2`;
  try {
    let data = await pool.query(query, values);
    let total = await pool.query(count);
    return {
      status: "success",
      data: {
        rows: data.rows,
        page,
        total: total.rows[0].total
      }
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
};

const addBinding = async (body) => {
  const {id_obu, nama, no_hp, plat_no, gol, status} = body
  const query = `INSERT INTO bind_obu_dana (id_obu, nama, no_hp, plat_no, gol, status, created_at) 
  VALUES ('${id_obu}','${nama}', '${no_hp}', '${plat_no}', '${gol}', '${status}', NOW()::timestamp(0)) RETURNING *`;
  try {
    let result = await pool.query(query);
    return {
      status: "success",
      data: result.rows[0]
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message
    }
  }
}

module.exports = {
  getBinding,
  addBinding
};
