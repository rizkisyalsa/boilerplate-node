const { pool } = require("../../core/database");

const getBinding = async (limit, page, search) => {
  let offset = 0;
  if (limit && page) {
    offset = (page - 1) * limit;
  }
  let values = [limit, offset];
  let count = `SELECT COUNT(*) AS total FROM bind_obu_dana`;
  let query = `SELECT * FROM bind_obu_dana`;
  let optionalQuery = ` WHERE id_obu ILIKE '%${search}%' OR nama ILIKE '%${search}%' OR no_hp ILIKE '%${search}%' OR plat_no ILIKE '%${search}%' OR gol ILIKE '%${search}%' OR to_char(created_at, 'DD-MM-YYYY') ILIKE '%${search}%' OR status ILIKE '%${search}%'`
  
  if (search) {
    count += optionalQuery;
    query += optionalQuery;
  }
  query += ` ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
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
    };
  }
};

const addBinding = async body => {
  const { id_obu, nama, no_hp, plat_no, gol, status } = body;
  const query = `INSERT INTO bind_obu_dana (id_obu, nama, no_hp, plat_no, gol, status, created_at) 
  VALUES ($1, $2, $3, $4, $5, $6, NOW()::timestamp(0)) RETURNING *`;
  const value = [id_obu, nama, no_hp, plat_no, gol, status];
  try {
    let result = await pool.query(query, value);
    return {
      status: "success",
      data: result.rows[0]
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message
    };
  }
};

const updateStatus = async (id, status) => {
  const query = `UPDATE bind_obu_dana SET status = $2 WHERE id_obu like $1 RETURNING *`;
  const value = [id, status];
  try {
    let result = await pool.query(query, value);
    return {
      status: "success",
      data: result.rows[0]
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message
    };
  }
};

const updateMultipleStatus = async data => {
  let success = [];
  for (let i = 0; i < data.length; i++) {
    const query = `UPDATE bind_obu_dana SET status = $2 WHERE id_obu like $1 RETURNING *`;
    const value = [data[i].id, data[i].status];
    try {
      let result = await pool.query(query, value);
      success.push(result.rows[0].id_obu);
    } catch (err) {
      return {
        status: "error",
        message: err.message
      };
    }
  }
  return {
    status: "success",
    data: {
      rows: success.join(","),
      status: data[0].status
    }
  };
};

module.exports = {
  getBinding,
  addBinding,
  updateStatus,
  updateMultipleStatus
};
