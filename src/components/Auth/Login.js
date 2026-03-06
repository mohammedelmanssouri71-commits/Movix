import { Link } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import { UserContext } from "../../contexts/UserContext";
import { useDispatch } from "react-redux";
import { show, hide } from "../../slices/alertSlice";

export default function Login(){
    const userRef = useRef();
    const pswrdRef = useRef();
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const [users, setUsers] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${JSON_API_URL}/users`)
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])

    function handleLogin(e){
        e.preventDefault();

        const u = users.find(u => u.username === userRef.current.value && u.password === pswrdRef.current.value);

        if (u){
            setUser(u);
            localStorage.setItem("userId", u.id);
            dispatch(show({type: "success", message: `Welcome again ${u.fullName}!`}))
            setTimeout(() => {
                dispatch(hide());
                navigate("/");
            },3000)
        }else{
            dispatch(show({type: "error", message: `Check your username or password!`}))
            setTimeout(() => {
                dispatch(hide());
            },3000)
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
                <p>You don't have an account. <Link to="/register">Register Now</Link></p>

                <button className="auth-btn">Login</button>
            </form>
        </div>
    )
}