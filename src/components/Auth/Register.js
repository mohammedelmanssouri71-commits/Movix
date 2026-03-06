import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import { useDispatch } from "react-redux";
import { show, hide } from "../../slices/alertSlice";

export default function Register(){
    const nameRef = useRef();
    const userRef = useRef();
    const pswrdRef = useRef();
    const photoRef = useRef();
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
    
    function checkUserName(){
        if (users.filter(u => u.username === userRef.current.value).length === 0){
            return true;
        }else {
            return false;
        }
    }


    function handleRegister(e) {
        e.preventDefault();
        if (!checkUserName()) {
            dispatch(show({type: "error", message: "You can't use this username!"}))
            setTimeout(() => {
                dispatch(hide())
            },3000)
            return;
        }
        const newUser = {
            fullName : nameRef.current.value,
            username : userRef.current.value,
            password : pswrdRef.current.value,
            image : photoRef.current.value || "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg",
            preferences : {
                "tv" : [],
                "movie" : []
            }
        }
        fetch(`${JSON_API_URL}/users`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => {
            if (res.ok){
                console.log("User is created!");
            }
            return res.json();
        })
        .then(data => {
            setUser(data);
            localStorage.setItem("userId", data.id);
            dispatch(show({type: "success", message: `Welcome ${data.fullName} You are our new user!`}))
            setTimeout(() => {
                dispatch(hide());
                navigate("/");
            },3000)
        })
    }

    return (
        <div className="auth-container">
            <h2>Welcome To Movix</h2>
            <p>Enjoy your time!</p>

            <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" ref={nameRef} required />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" ref={userRef} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={pswrdRef} required />
                </div>

                <div className="form-group">
                    <label>Photo</label>
                    <input type="url" ref={photoRef} placeholder="copy an url" />
                </div>

                <button className="auth-btn">Register</button>
            </form>
            </div>

    )
}