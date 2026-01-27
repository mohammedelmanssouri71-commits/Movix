import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar(){
    const searchRef = useRef();
    const navigate = useNavigate();
    const [showInp, setShowInp] = useState(false);
    const styleInp = {
        display: "none"
    }
    function handleSubmit(e){
        e.preventDefault();
        navigate(`/search/${searchRef.current.value}`);
    }
    return (
        <div className="sidebar">
            <button><Link className="link" to="/"><i class="fa-solid fa-house"></i></Link></button>
            <div className="container-search">
                <button onClick={() => setShowInp(!showInp)}><Link className="link"><i class="fa-solid fa-magnifying-glass"></i></Link></button>
                <form onSubmit={handleSubmit}>
                    <input ref={searchRef} type="search" style={showInp?{}:styleInp} placeholder="Search a movie"/>
                </form>
            </div>
            <button><Link to="favorites" className="link"><i class="fa-regular fa-bookmark"></i></Link></button>
            <button><Link className="link"><i class="fa-solid fa-gear"></i></Link></button>
        </div>
    )
}