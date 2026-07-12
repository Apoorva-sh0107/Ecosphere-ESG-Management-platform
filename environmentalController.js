const pool = require('../config/db');

// GET /api/environmental/goals
// Returns all goals joined with department name, plus a derived progress %.
async function getGoals(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT g.id, g.name, d.name AS department, g.department_id,
              g.target_co2, g.current_co2, g.deadline, g.status,
              ROUND((g.current_co2 / g.target_co2) * 100, 0) AS progress
       FROM environmental_goals g
       JOIN departments d ON d.id = g.department_id
       ORDER BY g.deadline ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
}

// GET /api/environmental/goals/:id
async function getGoalById(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT g.*, d.name AS department FROM environmental_goals g
       JOIN departments d ON d.id = g.department_id
       WHERE g.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Goal not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
}

// POST /api/environmental/goals
async function createGoal(req, res) {
  try {
    const { name, department_id, target_co2, current_co2, deadline, status } = req.body;

    if (!name || !department_id || !target_co2 || !deadline) {
      return res.status(400).json({ error: 'name, department_id, target_co2 and deadline are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO environmental_goals (name, department_id, target_co2, current_co2, deadline, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, department_id, target_co2, current_co2 || 0, deadline, status || 'Active']
    );

    res.status(201).json({ id: result.insertId, message: 'Goal created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create goal' });
  }
}

// PUT /api/environmental/goals/:id
async function updateGoal(req, res) {
  try {
    const { name, department_id, target_co2, current_co2, deadline, status } = req.body;

    const [result] = await pool.query(
      `UPDATE environmental_goals
       SET name = ?, department_id = ?, target_co2 = ?, current_co2 = ?, deadline = ?, status = ?
       WHERE id = ?`,
      [name, department_id, target_co2, current_co2, deadline, status, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Goal not found' });
    res.json({ message: 'Goal updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update goal' });
  }
}

// DELETE /api/environmental/goals/:id
async function deleteGoal(req, res) {
  try {
    const [result] = await pool.query('DELETE FROM environmental_goals WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete goal' });
  }
}

module.exports = { getGoals, getGoalById, createGoal, updateGoal, deleteGoal };
