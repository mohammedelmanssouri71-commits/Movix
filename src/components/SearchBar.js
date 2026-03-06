import { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBar(){
    const inpRef = useRef();
    const {query} = useParams();
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        navigate(`/search/${inpRef.current.value}`);
    }
    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input ref={inpRef} defaultValue={query}/>
            <button><i class="fa-solid fa-xmark"></i></button>
        </form>
    )
}