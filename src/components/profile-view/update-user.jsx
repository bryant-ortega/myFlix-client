import React from "react";


function UpdateUser ({handleSubmit, handleUpdate}) {


  return (
      <Form onSubmit={handleSubmit}>
          <h4>Update your profile information.</h4>
          <p></p>
          <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                  type="text"
                  name="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  minLength="5"
              />
          </Form.Group>
          <p></p>
          <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength="5"
              />
          </Form.Group>
          <p></p>
          <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
              />
          </Form.Group>
          <p></p>
          <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                  type="date"
                  value={new Date(user.Birthday).toISOString().slice(0, 10)}
                  onChange={e => setBirthday(e.target.value)}
                  required
              />
          </Form.Group>
          <p></p>
          <Button variant="primary" type="submit">
              Save changes
          </Button>
      </Form>
  );
};

export default UpdateUser