import { Link } from "react-router-dom";
import unknownProfile from '../assets/unknown.jpg';
import women from '../assets/womenProfile.jpg';


export default function SearchCard({media}){
    let src = '';
    if(media.media_type !== 'person'){
        src = `https://image.tmdb.org/t/p/original${media.poster_path}`;
    }else if(media.profile_path){
        src = `https://image.tmdb.org/t/p/original${media.profile_path}`;
    }else{
        src = media.gender === 0 ? unknownProfile : women;
    }
    const name = media.media_type === "movie"?media.title:media.name;
    return (
        <div className="search-card">
            <img src={src} alt="poster" loading="lazy"/>
            <div>
                <div>
                    <h2><Link className="link" to={`/${media.media_type}-details/${media.id}`}>{name}</Link></h2>
                    <span>{media.media_type === 'movie'?media.release_date:media.first_air_date}</span>
                </div>
                {media.media_type !== 'person' ? <p>{media.overview.length > 200?media.overview.slice(0,200) + "...": media.overview}</p>:
                <div className="labels">
                    {media.known_for.map((m,index) => <span key={index} className="label">{m.name || m.title}</span>)}
                </div>
                }
            </div>
        </div>
    )
}