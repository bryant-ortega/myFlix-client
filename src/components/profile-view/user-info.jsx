import React from "react";
import { Button } from "react-bootstrap";

function UserInfo({ email, name, birthday }) {
  return (
      <>
          <h4>Profile</h4>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>
              Birthday:{" "}
              {new Date(birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
              })}
          </p>
      </>
  );
}

export default UserInfo

