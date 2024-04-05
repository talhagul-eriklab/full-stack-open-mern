import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword } from "../../redux/reducers/userReducer";

const LoginForm = ({ handleLogin }) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.users.username);
  const password = useSelector((state) => state.users.password);

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
