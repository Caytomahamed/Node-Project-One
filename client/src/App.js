import { useEffect, useState } from "react";
import "./App.css";
import Form from "./component/Form";
import Users from "./component/Users";

function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/users");
        const users = await res.json();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  });

  return (
    <div className="App">
      <div className="form-con">
        <Form />
      </div>

      <div className="user-con">
        <Users users={users} />
      </div>
    </div>
  );
}

export default App;
