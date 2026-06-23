import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchStudents = () => {
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            age,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setName("");
      setAge("");

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = (student) => {
    setName(student.name);
    setAge(student.age);
    setEditingId(student.id);
  };

  const updateStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/students/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            age,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setName("");
      setAge("");
      setEditingId(null);

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Students Management</h1>

          <div>
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <h3>
          {editingId ? "Edit Student" : "Add Student"}
        </h3>

        <div className="row mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            {editingId ? (
              <button
                className="btn btn-warning w-100"
                onClick={updateStudent}
              >
                Update Student
              </button>
            ) : (
              <button
                className="btn btn-success w-100"
                onClick={addStudent}
              >
                Add Student
              </button>
            )}
          </div>
        </div>

        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
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

export default Students;