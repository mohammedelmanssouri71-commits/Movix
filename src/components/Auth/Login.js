import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { UserContext } from "../../contexts/UserContext";
import { useDispatch } from "react-redux";
import { show, hide } from "../../slices/alertSlice";
import { setAuthSession } from "../../utils/auth";

export default function Login() {
  const userRef = useRef();
  const pswrdRef = useRef();
  const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${JSON_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userRef.current.value,
          password: pswrdRef.current.value,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.accessToken || !data.user) {
        throw new Error(data?.message || "Check your username or password!");
      }

      setUser(data.user);
      setAuthSession({ accessToken: data.accessToken, user: data.user });

      dispatch(show({ type: "success", message: `Welcome again ${data.user.fullName}!` }));
      setTimeout(() => {
        dispatch(hide());
        navigate("/");
      }, 3000);
    } catch (error) {
      dispatch(show({ type: "error", message: error.message || "Check your username or password!" }));
      setTimeout(() => {
        dispatch(hide());
      }, 3000);
    }
  }

  return (
    <div className="auth-container">
      <h2>Welcome To Movix</h2>
      <p>Enjoy your time!</p>

      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Username</label>
          <input type="text" ref={userRef} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" ref={pswrdRef} required />
        </div>
        <p>
          You don't have an account. <Link to="/register">Register Now</Link>
        </p>

        <button className="auth-btn">Login</button>
      </form>
    </div>
  );
}
