import React from "react";
import "../App.css";
import Spinner from "./Spinner";

function User(props) {
  const { user } = props;
  return (
    <>
      {!user || Object.keys(user).length === 0 ? (
        <Spinner />
      ) : (
        <div className="user">
          <div className="user-header">
            <img src={user.image} alt="image" className="user-image" />
            <h3>{user.name}</h3>
          </div>
          <p className="user-bio">{user.bio}</p>
          <div className="icons">
            <div className="icon">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="icon">
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
