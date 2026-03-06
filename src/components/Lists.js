import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewList } from "../slices/listSlice";

export default function Lists({media}){
    const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
    const dispatch = useDispatch();
    const [lists, setLists] = useState([]);
    const listRef = useRef();

    useEffect(async () => {
        try {
            const res = await axios.get(`${JSON_API_URL}/lists`);
            setLists(res.data);
        }catch {
            console.log("JSON SERVER Error");
        }
    }, [])
    function handleAddNewList(){
        dispatch(addNewList({name: listRef.current.value, content: [media]}));
        
    }
    return (
        <div>
            {lists.map(l => {
                return (
                    <div key={l.id}>
                        <img src={l.content[l.content.length - 1].backdrop_path}/>
                        <p>{l.name}</p>
                        <button><i class="fa-regular fa-bookmark"></i></button>
                    </div>
                )
            })}
            <button>Create a List</button>
            <form>
                <h3>New List</h3>
                <div>
                    <label>Name</label>
                    <input ref={listRef}/>
                </div>
                <button onClick={handleAddNewList}>Save</button>
            </form>
        </div>
    )
}