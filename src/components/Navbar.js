import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Profil from "./Profil";
import { useEffect, useState, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/media.png';
import { clearAuthSession } from '../utils/auth';

export default function Navbar(){
    const [showProfil,setShowProfil] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const profil = useRef();

    function logout(){
        setUser(null);
        clearAuthSession();
        navigate("/movies");
    }

    useEffect(() => {
        const hideProfil = (e) => {
            console.log(e.target);
            if (profil.current && !profil.current.contains(e.target)){
                console.log("removed");
                setShowProfil(false);
            }

        }
        document.addEventListener("mousedown", hideProfil);
        return () => {
            document.removeEventListener("mousedown", hideProfil)
        }
    },[])

    return (
        <header>
            <h1>Movix</h1>
            <nav>
                <button><NavLink to="/movies" className={({isActive}) => isActive?"active link":"link"}>Movies</NavLink></button>
                <button><NavLink to="/tv-shows" className={({isActive}) => isActive?"active link":"link"}>TV Shows</NavLink></button>
                <button><NavLink to="/persons" className={({isActive}) => isActive?"active link":"link"}>Popular Actors</NavLink></button>
            </nav>
            <div>
                {/* <button className="btn-pick"><i class="fa-solid fa-robot"></i> AI Picks</button> */}
                <button><i class="fa-regular fa-moon"></i></button>
                {user && <button onClick={() => logout()}><i class="fa-solid fa-arrow-right-from-bracket"></i></button> }
                {user ? <button onClick={(e) => {
                    e.stopPropagation();
                    setShowProfil(!showProfil);
                }}><img src={user.image} alt="profil"/></button>: <button className="btn-login"><Link to="/login" className="link">Login</Link></button>}
            </div>
            {showProfil && <div ref={profil} onClick={(e) => e.stopPropagation()}
            className="profil-card"><Profil onShowProfil={setShowProfil}/></div>}
        </header>
    )
}