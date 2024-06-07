import { FunctionComponent } from "preact";
import { Data } from "../types.ts";

const Login: FunctionComponent<Data> = ({ message }) => {
  return (
    <div class="login-container">
      <h2>Login</h2>
      {message && <p class="error-message">{message}</p>}
      <form method="POST" action="/login">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
        <p class="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
