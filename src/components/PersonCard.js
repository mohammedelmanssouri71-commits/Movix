import man from '../assets/unknown.jpg';
import women from '../assets/womenProfile.jpg';
import { Link } from 'react-router-dom';

export default function PersonCard({person}){
    let src = '';
    if (person.profile_path){
        src = `https://image.tmdb.org/t/p/original${person.profile_path}`;
    }else {
        src = man;
    }
    return (
        <Link to={`/person-details/${person.id}`}>
            <div className="cast-card">
                <img src={src} alt="actor"/>
                <div>
                    <h3>{person.name}</h3>
                    {person.character && <p>{person.character}</p>}
                </div>
            </div>
        </Link>
    )
}