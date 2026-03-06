import { Link } from "react-router-dom"
import "./Profil.css";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";


export default function Profil({onShowProfil}) {
  const {user, setUser} = useContext(UserContext);
  return (
    <div>
      <img src={user.image} alt="profil" />
      <div>
        <h3>{user.fullName}</h3>
        <p>@{user.username}</p>
      </div>

      <Link to="/settings" className="settings-btn" onClick={() => onShowProfil(false)}>
        <i className="fa-solid fa-gear"></i>
      </Link>
    </div>
  )
}
