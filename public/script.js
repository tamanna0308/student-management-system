// Load students
async function getStudents() {
    const response = await fetch("/students");
    const students = await response.json();

    let table = "";

    students.forEach(student => {
        table += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button
class="delete-btn"
onclick="deleteStudent(${student.id})">
Delete
</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("studentTable").innerHTML =
        table;
}

// Add student
async function addStudent() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;

    if (!name || !age || !course || !marks) {
        alert("Please fill all fields");
        return;
    }

    await fetch("/add-student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            age,
            course,
            marks
        })
    });

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";

    getStudents();
}

// Delete student
async function deleteStudent(id) {
    await fetch(`/delete-student/${id}`, {
        method: "DELETE"
    });

    getStudents();
}

getStudents();
// Search student
function searchStudent() {
    const input =
        document.getElementById("search")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        const name =
            row.children[1]
            .textContent
            .toLowerCase();

        if (name.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}