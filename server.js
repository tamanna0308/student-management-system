require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MySQL Connection Pool (Railway + Render)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("Student Management System Running");
});

// Add Student API
app.post("/add-student", (req, res) => {
    const { name, age, course, marks } = req.body;

    const sql =
        "INSERT INTO students (name, age, course, marks) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, age, course, marks], (err, result) => {
        if (err) {
            console.log("Add student error:", err);
            res.status(500).send("Error adding student");
        } else {
            res.send("Student added successfully");
        }
    });
});

// Get All Students API
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Fetch student error:", err);
            res.status(500).send("Error fetching students");
        } else {
            res.json(result);
        }
    });
});

// Delete Student API
app.delete("/delete-student/:id", (req, res) => {
    const studentId = req.params.id;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.log("Delete student error:", err);
            res.status(500).send("Error deleting student");
        } else {
            res.send("Student deleted successfully");
        }
    });
});

// Update Student API
app.put("/update-student/:id", (req, res) => {
    const studentId = req.params.id;
    const { name, age, course, marks } = req.body;

    const sql =
        "UPDATE students SET name=?, age=?, course=?, marks=? WHERE id=?";

    db.query(
        sql,
        [name, age, course, marks, studentId],
        (err, result) => {
            if (err) {
                console.log("Update student error:", err);
                res.status(500).send("Error updating student");
            } else {
                res.send("Student updated successfully");
            }
        }
    );
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});