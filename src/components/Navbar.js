import { Link } from "react-router-dom";
import profil from '../assets/profil.jpg';
import Profil from "./Profil";
import { useState } from "react";

export default function Navbar(){
    const [isClick,setClick] = useState(false)
    return (
        <header>
            <h1>Movix</h1>
            <nav>
                <button><Link to="/movies" className="link">Movies</Link></button>
                <button><Link className="link">TV Shows</Link></button>
                <button><Link className="link">Series</Link></button>
                <button><Link className="link">Animes</Link></button>
            </nav>
            <div>
                <button><i class="fa-regular fa-moon"></i></button>
                <button><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                <button onClick={()=>setClick(true) }><img src={profil} alt="profil"/></button>
            </div>
            {isClick&&<Profil />}
        </header>
    )
}