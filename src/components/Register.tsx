import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import "../css/auth.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import auth from "../firebase";
import { useStateValue } from "../hooks/useStateValue";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, dispatch] = useStateValue();

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch({
        type: ACTION_TYPES_CONSTANTS.SAVE_USER,
        payload: user,
      });

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign up</h1>
        <form onSubmit={handleRegister}>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
          <button type="submit" className="login__signInButton">
            Sign up
          </button>
        </form>
        <p>
          By signing in you agree to Amazon's Conditions of Use ans Sale.Please
          see our privacy Notice,our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>
        <Link to="/register">
          <button className="login__registerButton">
            Already have an account?
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
