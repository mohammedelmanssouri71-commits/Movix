import axios from "axios";
import { error } from "loglevel";
import { useEffect, useState, useRef, useContext } from "react"
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../slices/commentsSlice";
import { UserContext } from "../contexts/UserContext";
import { fetchComments } from "../slices/commentsSlice";
import Loader from "./Loader";

export default function CommentsList({media}){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const msgRef = useRef();
    const {user} = useContext(UserContext);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComments());
    }, [])

    const comments = useSelector(state => state.comments.value);
    const isLoading = useSelector(state => state.comments.loading);

    useEffect(() => {
        msgRef.current.focus();
    },[])

    function handleAddComment(e){
        e.preventDefault();
        const msg = msgRef.current.value;
        const newComment = {
            userId: user.id,
            media: media,
            message: msg,
            likes: [],
            date: new Date().toLocaleString()
        }

        axios.post(`${JSON_API_URL}/comments`, newComment)
        .then(res => {
            dispatch(addComment(res.data));
            msgRef.current.value = "";
        });
    }
    if (isLoading) return <Loader/>
    const commentsList = comments.filter(c => c.media.id === media.id && c.media.type === media.type).map(c => <Comment comment={c} key={c.id}/>)
    return (
        <div className="comments">
            <div>
                <h2>Comments - ({commentsList.length})</h2>
                {commentsList.length === 0? <p>No comments</p>:commentsList}
            </div>
            <form onSubmit={handleAddComment}>
                <div>
                    <input placeholder="Type a comment" ref={msgRef} required/>
                    <button><i class="fa-solid fa-arrow-up"></i></button>
                </div>
            </form>
        </div>
    )
}