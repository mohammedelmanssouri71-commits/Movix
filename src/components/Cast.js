import { Link } from "react-router-dom";

export default function Cast({cast}){
    const castList = cast ? cast.slice(0,10).map(c => {
        return (
            <div key={c.cast_id} className="cast-card">
                <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : null} alt="actor"/>
                <div>
                    <h3>{c.name}</h3>
                    <p>{c.character}</p>
                </div>
            </div>
        )
    }) : [];
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