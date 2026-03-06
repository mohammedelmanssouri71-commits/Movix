import { Link } from "react-router-dom";
import PersonCard from "./PersonCard";


export default function Cast({cast}){
    console.log(cast);
    const castList = cast ? cast.slice(0,10).map(c => <PersonCard person={c} key={c.credit_id}/>) : [];
    return (
        <div className="cast">
            <h2>Cast</h2>
            <div className="cast-list">
                {castList}
                <div>
                    <Link to="/cast" className="link">Read More</Link>
                </div>
            </div>
        </div>
    )
}