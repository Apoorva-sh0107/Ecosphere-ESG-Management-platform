const pool = require('../config/db');

// GET /api/departments
async function getDepartments(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM departments ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
}

module.exports = { getDepartments };
