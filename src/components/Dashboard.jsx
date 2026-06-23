import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="mb-3">Dashboard</h1>

        {user ? (
          <>
            <h3>Welcome {user.username}</h3>
            <p>Email: {user.email}</p>

            <div className="mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/students")}
              >
                View Students
              </button>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;