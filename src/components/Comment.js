import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { toggleLike } from "../slices/commentsSlice";
import axios from "axios";
import { authFetch } from "../utils/auth";


export default function Comment({comment}){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const {user} = useContext(UserContext);
    const [userComment, setUserComment] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authFetch(`${JSON_API_URL}/users/${comment.userId}`)
        .then(res => res.json())
        .then(data => {
            setUserComment(data);
            setLoading(false);
        })
    },[])

    function handleLike(){
        axios.patch(`${JSON_API_URL}/comments/${comment.id}`, {
            likes: comment.likes.includes(user.id) ? comment.likes.filter(l => l !== user.id) : [...comment.likes, user.id]
        })
        .then(res => {
            dispatch(toggleLike({commentId: comment.id, userId: user.id}));
        })
    }
    if(loading) return <Loader/>

    return (
        <div className="comment">
            <div className={user.id === userComment.id ? "owner":""}>
                <img src={userComment.image}/>
                <div>
                    <h3>{user.id === userComment.id ? "You":`@${userComment.username}`}</h3>
                    <p>{comment.message}</p>
                </div>
            </div>
            <div>
                <button onClick={handleLike}>{comment.likes.includes(user.id) ? <i class="fa-solid fa-heart" style={{color: "red"}}></i>: <i class="fa-regular fa-heart"></i>}</button>
                <span>{comment.likes.length}</span>
            </div>
        </div>
    )
}