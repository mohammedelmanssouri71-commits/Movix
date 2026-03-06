import { useState } from "react";
import profil from '../assets/profil.jpg';


export default function VoteModal(){
    const [star, setStar] = useState("regular");
    return (
        <div className="vote-modal">
            <img src={profil} alt="profil" loading="lazy"/>
            <p>How do you rate this movie?</p>
            <div className="stars">
                <button onClick={() => setStar(star === "solid" ? "regular":"solid")}><i class={`fa-${star} fa-star`}></i></button>
                <button><i class={`fa-${star} fa-star`}></i></button>
                <button><i class={`fa-${star} fa-star`}></i></button>
                <button><i class={`fa-${star} fa-star`}></i></button>
                <button><i class={`fa-${star} fa-star`}></i></button>
            </div>
            <div className="actions">
                <button>Cancel</button>
                <button>Submit</button>
            </div>
        </div>
    )
}