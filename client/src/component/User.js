import React, { useEffect, useState } from "react";
import "../App.css";
import { BASE_URL } from "../config";
import Form from "./Form";
import Spinner from "./Spinner";

function User(props) {
  const { user } = props;

  const [data, setData] = useState({});

  const handleOnClickEdit = (e) => {
    // .classList.add("hidden")
    const user = e.target.parentNode;
    const data = {
      name: user.querySelector("h3").textContent,
      bio: user.querySelector("p").textContent,
      image: user.querySelector("img").src,
    };
    setData(data);
  };

  const handleOnClickDelete = (e) => {
    const userId = e.target.parentNode.dataset.id;

    fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
    })
      .then((res) => console.log(res))
      .catch((erro) => console.error(erro));
  };

  Object.keys(data).length === 0 && <Form data={data} />;

  return (
    <>
      {!user || Object.keys(user).length === 0 ? (
        <Spinner />
      ) : (
        <div className="user" data-id={user.id}>
          <div className="user-header">
            <img src={user.image} alt="image" className="user-image" />
            <h3>{user.name}</h3>
          </div>
          <p className="user-bio">{user.bio}</p>
          <span
            className="material-symbols-outlined icon-edit"
            onClick={handleOnClickEdit}
          >
            edit
          </span>
          <span
            className="material-symbols-outlined icon-delete"
            onClick={handleOnClickDelete}
          >
            delete
          </span>
        </div>
      )}
    </>
  );
}

export default User;
