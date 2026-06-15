import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setUser(data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {user ? (
        <>
          <h2>Welcome {user.username}</h2>
          <p>Email: {user.email}</p>

          <br />

          <button onClick={() => navigate("/students")}>
            View Students
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;