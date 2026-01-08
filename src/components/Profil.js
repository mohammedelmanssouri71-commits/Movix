import { Link } from "react-router-dom"
import profil from "../assets/profil.jpg"
import "./Profil.css"

export default function Profil() {
  return (
    <div className="profil-card">
      <img src={profil} alt="profil" />
      <h3>Mohamed</h3>
      <p>@username</p>

      <Link to="/settings" className="settings-btn">
        <i className="fa-solid fa-gear"></i>
      </Link>
    </div>
  )
}
