import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar(){
    const searchRef = useRef();
    const [showInp, setShowInp] = useState(false);
    const styleInp = {
        display: "none"
    }
    return (
        <div className="sidebar">
            <button><Link className="link" to="/"><i class="fa-solid fa-house"></i></Link></button>
            <div className="container-search">
                <button onClick={() => setShowInp(!showInp)}><Link className="link"><i class="fa-solid fa-magnifying-glass"></i></Link></button>
                <input ref={searchRef} type="search" style={showInp?{}:styleInp} placeholder="Search a movie"/>
            </div>
            <button><Link to="favorites" className="link"><i class="fa-regular fa-bookmark"></i></Link></button>
            <button><Link className="link"><i class="fa-solid fa-gear"></i></Link></button>
        </div>
    )
}