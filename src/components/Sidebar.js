import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Sidebar(){
    const searchRef = useRef();
    const navigate = useNavigate();
    const [showInp, setShowInp] = useState(false);
    const {user} = useContext(UserContext);
    const styleInp = {
        display: "none"
    }

    useEffect(() => {
        searchRef.current.focus();
    }, [showInp]);
    
    function handleSubmit(e){
        e.preventDefault();
        navigate(`/search/${searchRef.current.value}`);
        searchRef.current.value = "";
        setShowInp(false);
    }
    return (
        <div className="sidebar">
            <button><Link className="link" to="/"><i class="fa-solid fa-house"></i></Link></button>
            <div className="container-search">
                <button onClick={() => setShowInp(!showInp)}>
                <Link className="link"><i class="fa-solid fa-magnifying-glass"></i></Link></button>
                <form onSubmit={handleSubmit}>
                    <input ref={searchRef} type="search" style={showInp?{}:styleInp} placeholder="Search a Movie, a TV Show, a Person"/>
                </form>
            </div>
            <button><Link to={user?"favorites":""} className="link"><i class="fa-solid fa-heart"></i></Link></button>
            <button><Link className="link" to="/settings"><i class="fa-solid fa-gear"></i></Link></button>
        </div>
    )
}