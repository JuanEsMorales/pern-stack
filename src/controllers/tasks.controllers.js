const pool = require("../db")

const getAllTasks = async (req, res) => {
  const respond = await pool.query("SELECT * FROM task")
  res.json(respond.rows)
}

const getTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const task = await pool.query("SELECT * FROM task WHERE id = $1", [id])
    if (task.rows == 0) return res.status(404).send("This task doesn't exists")
    res.json(task.rows[0])
  } catch (error) {
    next(error)
  }
}

const createTask = async (req, res, next) => {
  const { title, description } = req.body
  try {
    const newTask = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    )
    res.send(newTask.rows[0])
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  const { id } = req.params
  const { title, description } = req.body
  try {
    const task = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3', [title, description, id])
    if (task.rowCount == 0) return res.status(404).send("This task doesn't exists") 
    res.json({message: "Task updated"})
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const task = await pool.query(
      "DELETE FROM task WHERE id = $1",
      [id]
    )
    if (task.rowCount == 0) return res.status(404).json({ message: "This task doesn't exists" })
    res.json({ message: "Task deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}
