const { pool } = require("../../core/database");

const getData = async (limit, page, search) => {
  let result = [];
  let offset = 0;
  if (limit && page) {
    offset = (page - 1) * limit;
  }
  let data;
  let values = [limit, offset];
  let count = `SELECT COUNT(*) AS total FROM bind_obu_dana`;
  let query = `SELECT * FROM bind_obu_dana`;
  if (search) {
    count += ` WHERE id_obu ILIKE '%${search}%' OR no_hp ILIKE '%${search}%' OR no_kend ILIKE '%${search}%' OR gol ILIKE '%${search}%'`;
    query += ` WHERE id_obu ILIKE '%${search}%' OR no_hp ILIKE '%${search}%' OR no_kend ILIKE '%${search}%' OR gol ILIKE '%${search}%'`;
  }
  query += ` ORDER BY created_at LIMIT $1 OFFSET $2`;
  try {
    data = await pool.query(query, values);
    total = await pool.query(count);
    result.push({
      rows: data.rows,
      page,
      total: total.rows[0].total
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getData
};
