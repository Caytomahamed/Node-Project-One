import React, { useState } from "react";
import "../App.css";
import { BASE_URL } from "../config";
import User from "./User";

const init = {
  name: "",
  bio: "",
  image: "",
};

function Form(props) {
  const [user, setUser] = useState(init);
  Object.keys(props).length > 0 && setUser(props.data);

  const handleChange = (e) => {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(init);

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log("sucess", res);
      })
      .catch((erro) => console.error("Error", erro));
  };
  return (
    <div className="form">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Enter users name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          value={user.bio}
          placeholder="Enter users bio"
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Enter users image url"
          value={user.image}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
