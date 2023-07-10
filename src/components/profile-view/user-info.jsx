import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserInfo({ email, name, birthday, handleDeleteUser }) {
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
            <Link to="/signup" className="d-flex justify-content-end">
                <Button
                    variant="link"
                    style={{ color: "red" }}
                    onClick={handleDeleteUser}
                >
                    Delete account
                </Button>
            </Link>
        </>
    );
}

export default UserInfo

