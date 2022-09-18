import React from "react";
import Spinner from "./Spinner";
import User from "./User";
import "../App.css"
function Users(props) {
  const { users } = props;

  return (
    <div className="users">
      {!users || Object.keys(users).length === 0 ? (
        <Spinner />
      ) : (
        users.map((user, key) => {
          return <User user={user} key={key} />;
        })
      )}
    </div>
  );
}

export default Users;
