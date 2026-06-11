const API_URL =
"https://student-management-system-mlz1.onrender.com";

// Load students
async function getStudents() {
    try {
        const response =
            await fetch(`${API_URL}/student`);

        const students =
            await response.json();

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
                    <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                    </button>
                </td>
            </tr>
            `;
        });

        document.getElementById(
            "studentTable"
        ).innerHTML = table;

    } catch (error) {
        console.log(
            "Error loading students:",
            error
        );
    }
}

// Add student
async function addStudent() {
    const name =
        document.getElementById("name").value;

    const age =
        document.getElementById("age").value;

    const course =
        document.getElementById("course").value;

    const marks =
        document.getElementById("marks").value;

    if (!name || !age || !course || !marks) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response =
            await fetch(
                `${API_URL}/add-student`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                        "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        age,
                        course,
                        marks
                    })
                }
            );

        const result =
            await response.text();

        alert(result);

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("course").value = "";
        document.getElementById("marks").value = "";

        getStudents();

    } catch (error) {
        console.log(
            "Error adding student:",
            error
        );
    }
}

// Delete student
async function deleteStudent(id) {
    try {
        await fetch(
            `${API_URL}/delete-student/${id}`,
            {
                method: "DELETE"
            }
        );

        getStudents();

    } catch (error) {
        console.log(
            "Error deleting student:",
            error
        );
    }
}

// Search student
function searchStudent() {
    const input =
        document.getElementById("search")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll(
            "#studentTable tr"
        );

    rows.forEach(row => {
        const name =
            row.children[1]
            .textContent
            .toLowerCase();

        row.style.display =
            name.includes(input)
            ? ""
            : "none";
    });
}

getStudents();