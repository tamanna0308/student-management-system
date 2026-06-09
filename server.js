const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tamanna786",
    database: "student_management"
});

// Connect database
db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Connected to MySQL");
    }
});

// Home route
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
            console.log(err);
            res.send("Error adding student");
        } else {
            res.send("Student added successfully");
        }
    });
});
// View All Students API
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error fetching students");
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
            console.log(err);
            res.send("Error deleting student");
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
                console.log(err);
                res.send("Error updating student");
            } else {
                res.send("Student updated successfully");
            }
        }
    );
});
// Server start
app.listen(5000, () => {
    console.log("Server running on port 5000");
});