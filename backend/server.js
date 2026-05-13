const express = require("express");
const cors = require("cors");
const pool = require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Server Running");
});


// GET ALL TASKS
app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// ADD TASK
app.post("/tasks", async (req, res) => {
    try {
        const { title, status } = req.body;

        const newTask = await pool.query(
            "INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *",
            [title, status]
        );

        res.json(newTask.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});