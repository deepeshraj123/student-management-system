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
    <div>
      <h1>Students List</h1>

      <h3>
        {editingId ? "Edit Student" : "Add Student"}
      </h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      {editingId ? (
        <button onClick={updateStudent}>
          Update Student
        </button>
      ) : (
        <button onClick={addStudent}>
          Add Student
        </button>
      )}
      <br />

<button onClick={handleLogout}>
  Logout
</button>

<hr />

      <hr />

      {students.map((student) => (
        <div key={student.id}>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>

          <button
            onClick={() => editStudent(student)}
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() => deleteStudent(student.id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Students;