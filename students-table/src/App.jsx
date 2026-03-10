import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function App() {

  const [students, setStudents] = useState([
    { id: 1, name: "Diya", email: "diya@gmail.com", age: 20 },
    { id: 2, name: "Siya", email: "siya@gmail.com", age: 22 }
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    }
  };

  const editStudent = (student) => {
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditId(student.id);
  };

  const addStudent = () => {

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      alert("Enter valid email");
      return;
    }

    if (editId !== null) {

      const updatedStudents = students.map((student) =>
        student.id === editId
          ? { ...student, name, email, age }
          : student
      );

      setStudents(updatedStudents);
      setEditId(null);

    } else {

      const newStudent = {
        id: Date.now(),
        name,
        email,
        age
      };

      setStudents([...students, newStudent]);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");

  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Students...</h2>;
  }

  return (

    <div>

      <h1 style={{ textAlign: "center" }}>Student Table</h1>
      <div className="container">

        <h2>Add Student</h2>

        <div className="form">

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <button className="add-btn" onClick={addStudent}>
            {editId ? "Update Student" : "Add Student"}
          </button>

        </div>

      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px"
        }}
      >

        <h2 style={{ margin: 0 }}>Student List</h2>

        <button className="download-btn" onClick={downloadExcel}>
          Download Excel
        </button>

      </div>
      <div style={{ padding: "0 20px" }}>

        <table style={{ width: "100%" }}>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (
              <tr key={student.id}>

                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default App;