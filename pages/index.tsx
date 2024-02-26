import { useEffect, useState } from "react";
import UserList from "./userList";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        {error ? <div>Error: {error}</div> : <UserList users={users} />}
      </div>
    </>
  );
};

export default HomePage;
