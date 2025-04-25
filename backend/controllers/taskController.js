
const db = require('../db');

exports.createTask = async (req, res) => {
  const {
    task_number, created_by, assigned_to, product,
    started_at, finished_at, task_type, status_task,
    description, dimensions, weight, special_handling
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO stock_task (
        task_number, created_by, assigned_to, product,
        started_at, finished_at, task_type, status_task,
        description, dimensions, weight, special_handling
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [task_number, created_by, assigned_to, product,
        started_at, finished_at, task_type, status_task,
        description, dimensions, weight, special_handling]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM stock_task ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    task_number, created_by, assigned_to, product,
    started_at, finished_at, task_type, status_task,
    description, dimensions, weight, special_handling
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE stock_task SET
        task_number = $1,
        created_by = $2,
        assigned_to = $3,
        product = $4,
        started_at = $5,
        finished_at = $6,
        task_type = $7,
        status_task = $8,
        description = $9,
        dimensions = $10,
        weight = $11,
        special_handling = $12
      WHERE id = $13 RETURNING *`,
      [task_number, created_by, assigned_to, product,
        started_at, finished_at, task_type, status_task,
        description, dimensions, weight, special_handling, id]
    );

    if (result.rowCount === 0) return res.status(404).send('Task not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM stock_task WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};